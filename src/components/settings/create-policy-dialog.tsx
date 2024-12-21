import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Radio, Switch, Button, Tooltip, Tag, message } from 'antd';
import { PolicyDialogProps, PolicyFormInterface } from '@/interfaces/settings-interface';
import { radioOptions, scanTypes } from '@/constants/reporting-constants';
import { MultiSelect } from '../atomic-components/multi-select';
import { useServices, useTags } from '@/queries/dashboard';
import { policyInitialState } from '@/constants/settings-constants';
import { useAddPolicy, useGetSmtp, useUpdatePolicy } from '@/queries/settings';
import { emailRegex } from '@/utils/common-utils';
import { settingsSubject } from '@/event-emitters/event-emitters';

export const PolicyDialog: React.FC<PolicyDialogProps> = ({ isModalOpen, setIsModalOpen, policyData, setEditPolicyData }) => {
    const [form] = Form.useForm<PolicyFormInterface>();

    const [type, setType] = useState("service_ids");
    const [emails, setEmails] = useState<string[]>([])
    const [sendAlerts, setSendAlerts] = useState(false);
    const [applications, setApplications] = useState<any>([])
    const [editFormData, setEditFormData] = useState<any>({})
    const [tagsData, setTagsData] = useState<any>([])
    const [inputEmail, setInputEmail] = useState('');

    const { data: services } = useServices({}, isModalOpen)
    const { data: tags } = useTags(isModalOpen)
    const { data: smtpList } = useGetSmtp({})

    const { mutate: addPolicy, isPending } = useAddPolicy()
    const { mutate: updatePolicy, isPending: isUpdating } = useUpdatePolicy()

    const handleEmailRemove = (emailToRemove: string) => {
        setEmails((prevEmails) => (prevEmails.filter(email => email !== emailToRemove)))
    };

    const handleAddEmail = (e: any) => {
        if (e.keyCode == 13 && emailRegex.test(inputEmail) && !emails.includes(inputEmail)) {
            setEmails((prev) => ([...prev, inputEmail]))
            setInputEmail('');
        }
    };

    const handleFinish = (values: PolicyFormInterface) => {
        if (!emails.length) {
            return
        }
        let payload = { ...values, email: emails }
        delete payload['type']
        payload['critical'] = Number(payload['critical'])
        payload['high'] = Number(payload['high'])
        payload['low'] = Number(payload['low'])
        payload['medium'] = Number(payload['medium'])
        payload['email'] = emails

        let policHandlerFunction = policyData ? updatePolicy : addPolicy
        if (policyData) {
            payload['id'] = policyData['id']
        }

        policHandlerFunction(payload, {
            onSuccess: (policy: any) => {
                handleClose();
                message.success(`Policy ${policyData ? 'Updated' : 'Added'} Successfully!`)
                settingsSubject.next({ action: policyData ? `policyUpdated` : `policyAdded`, policy })
            },
            onError: (error) => {
                console.error("Failed to add updated policy:", error);
                message.error(`Error ${policyData ? 'updating' : 'adding'} policy!`)
            },
        })
    };

    const handleClose = () => {
        form.resetFields()
        setEmails([])
        setType('service_ids')
        setIsModalOpen(false)
        setEditFormData(null)
        setEditPolicyData(null)
        setInputEmail('')
    }
    const handleSubmit = (e: any) => {
        // form.submit();
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    useEffect(() => {
        let mappedServices = services?.map((service: any) => ({ label: service.serviceName, value: service.id }))
        let mappedTags = tags?.map((tag: any) => ({ label: tag, value: tag }))
        setApplications(mappedServices)
        setTagsData(mappedTags)
    }, [services, tags])

    useEffect(() => {

        if (policyData) {
            setEditFormData(policyData)
            setEmails(policyData['email'])
            let severityCount: any = {}
            policyData?.severityResult?.map((severity: any) => {
                severityCount[severity['severity'].toLowerCase()] = severity['count']
            })
            setSendAlerts(policyData['sendAlerts'])

            policyData = { ...policyData, ...severityCount }
            form.setFieldsValue(policyData)
            if (policyData['tags']?.length) {
                setType('tags')
            }
        }
    }, [isModalOpen])

    return (
        <Modal
            title={`${policyData ? 'Edit' : 'Create'} Policy`}
            visible={isModalOpen}
            onCancel={handleClose}
            footer={null}
            width={700}
            className="modal-custom"
        >
            <div className='pt-2 px-3 border rounded m-1'>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    onKeyDown={handleKeyDown}
                    initialValues={policyInitialState}
                    className="grid grid-cols-2 gap-2"
                >

                    {/* Radio Button Group */}
                    <Form.Item name="type" className="col-span-2">
                        <Radio.Group
                            options={radioOptions}
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                            defaultValue={'service_ids'}
                            optionType="button"
                            buttonStyle="solid"
                            disabled={policyData != null}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Name is required' }]}
                    // className="col-span-2"
                    >
                        <Input placeholder="Enter name" />
                    </Form.Item>


                    <Form.Item
                        name={type == 'service_ids' ? 'serviceid' : type}
                        label={`Select ${type === "service_ids" ? "Applications" : "Tags"}`}
                        rules={[
                            {
                                required: true,
                                message: `Please select at least one ${type === "service_ids" ? "Application" : "Tag"}`,
                            },
                        ]}
                    >
                        <MultiSelect
                            options={type === "service_ids" ? applications : tagsData}
                            placeholder={`Select ${type === "service_ids" ? "Applications" : "Tags"}`}
                            isLoading={false}
                            maxTagCount={2}
                            defaultValue={editFormData?.[type == 'service_ids' ? 'serviceid' : 'tags']}
                            onChange={(e) => { setEditFormData((prev: any) => ({ ...prev, [type == 'service_ids' ? 'serviceid' : 'tags']: e })) }}
                        />
                    </Form.Item>

                    {/* Critical */}
                    <Form.Item
                        label="Critical"
                        name="critical"
                        rules={[{ required: true, message: 'Critical count is required' }]}
                    >
                        <Input type="number" min={0} placeholder="Enter critical count" />
                    </Form.Item>

                    {/* High */}
                    <Form.Item
                        label="High"
                        name="high"
                        rules={[{ required: true, message: 'High count is required' }]}
                    >
                        <Input type="number" min={0} placeholder="Enter high count" />
                    </Form.Item>

                    {/* Medium */}
                    <Form.Item
                        label="Medium"
                        name="medium"
                        rules={[{ required: true, message: 'Medium count is required' }]}
                    >
                        <Input type="number" min={0} placeholder="Enter medium count" />
                    </Form.Item>

                    {/* Low */}
                    <Form.Item
                        label="Low"
                        name="low"
                        rules={[{ required: true, message: 'Low count is required' }]}
                    >
                        <Input type="number" min={0} placeholder="Enter low count" />
                    </Form.Item>

                    {sendAlerts && (
                        <>
                            <Form.Item label="Email" name='email'>
                                <div className="flex">
                                    <Tooltip title='Press enter to add'>
                                        <Input
                                            type="email"
                                            value={inputEmail}
                                            onChange={(e) => setInputEmail(e.target.value)}
                                            onKeyUp={handleAddEmail}
                                            placeholder="Enter email"
                                            className="mr-2 p-1 border rounded"
                                        />
                                    </Tooltip>
                                </div>
                                {!emailRegex.test(inputEmail) && inputEmail && (
                                    <div className="text-red-500">Please enter a valid email address</div>
                                )}
                                {form.isFieldTouched('email') && !emails.length && <div className="text-red-500">Email is required</div>
                                }

                                {/* Displayed Emails */}
                                <div className="mt-2">
                                    {emails?.map((email: any) => (
                                        <Tag
                                            key={email}
                                            closable
                                            onClose={() => handleEmailRemove(email)}
                                        >
                                            {email}
                                        </Tag>
                                    ))}
                                </div>
                            </Form.Item>


                            <Form.Item
                                label="Select SMTP"
                                name="smtpId"
                                rules={[{ required: true, message: 'Please select SMTP' }]}
                            >
                                <MultiSelect
                                    options={
                                        smtpList?.users?.map((smtp: any) => ({ label: smtp.provider_name, value: smtp.id }))
                                    }
                                    placeholder={`Select SMTP`}
                                    isLoading={false}
                                    maxTagCount={4}
                                    defaultValue={editFormData?.['smtpId']}
                                    onChange={(e) => { setEditFormData((prev: any) => ({ ...prev, smtpId: e })) }}
                                    mode='single'
                                />
                            </Form.Item>
                        </>
                    )}
                    <Form.Item label='Scan Types' name='scanTypes' rules={[{ required: true, message: 'Please select scan types' }]} className='col-span-2'>
                        <MultiSelect
                            options={scanTypes.map((scan) => ({ label: scan.key, value: scan.value }))}
                            placeholder={`Select Scan Types`}
                            isLoading={false}
                            maxTagCount={4}
                            defaultValue={editFormData?.['scanTypes']}
                            onChange={(e) => { setEditFormData((prev: any) => ({ ...prev, scanTypes: e })) }}

                        />
                    </Form.Item>
                    {/* Switches */}
                    <Form.Item label='Send Alerts' name="sendAlerts" className='' layout='horizontal'>
                        <Switch onChange={setSendAlerts} checked={sendAlerts} />
                    </Form.Item>

                    <Form.Item label='Break Pipeline' name="breakPipeline" layout='horizontal'>
                        <Switch />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item className="col-span-2 flex justify-end">
                        <Button onClick={handleSubmit} type="primary" htmlType="submit" loading={isPending || isUpdating}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};