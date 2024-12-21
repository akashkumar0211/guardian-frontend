import React, { useEffect, useState } from "react";
import { Modal, Radio, Button, Form, Input, message, DatePicker, Tooltip } from "antd";
import { MultiSelect } from "../atomic-components/multi-select";
import { useServices, useTags } from "@/queries/dashboard";
import { radioOptions } from "@/constants/reporting-constants";
import { TokenDialogProps } from "@/interfaces/settings-interface";
import { disabledPreviousDates } from "@/utils/common-utils";
import { useAddToken } from "@/queries/settings";
import { settingsSubject } from "@/event-emitters/event-emitters";
import { CopyOutlined } from '@ant-design/icons';


export const TokenDialog: React.FC<TokenDialogProps> = ({ isModalOpen, setIsModalOpen }) => {
    const [type, setType] = useState("service_ids");
    const [applications, setApplications] = useState<any>([])
    const [tagsData, setTagsData] = useState<any>([])
    const [showCopyDialog, setShowCopyDialog] = useState<any>({
        visible: false,
        token: ''
    })

    const [form] = Form.useForm();

    const { data: services } = useServices({}, isModalOpen)
    const { data: tags } = useTags(isModalOpen)
    const { mutate: addToken, isPending } = useAddToken()

    const handleClose = () => {
        form.resetFields()
        setIsModalOpen(false);
        setShowCopyDialog({ token: '', visible: false })
    };

    const handleCopyClick = () => {
        message.success('Token Copied Successfully!')
        navigator.clipboard.writeText(showCopyDialog.token);
        setShowCopyDialog({ token: '', visible: false })
        handleClose();
    }

    const handleSubmit = (formData: any) => {
        formData['expiry_date'] = new Date(formData['expiry_date']).toISOString()
        formData['applications'] = formData['service_ids']
        delete formData['type']
        delete formData['service_ids']


        addToken(formData, {
            onSuccess: (token: any) => {
                setShowCopyDialog({ visible: true, token: token['Token'] })
                message.success("Token Added Successfully!")
                settingsSubject.next({ action: 'tokenAdded' })
            },
            onError: (error) => {
                console.error("Failed to add token:", error);
                message.error("Error adding token!")
            },
        });
    };

    useEffect(() => {
        let mappedServices = services?.map((service: any) => ({ label: service.serviceName, value: service.id }))
        let mappedTags = tags?.map((tag: any) => ({ label: tag, value: tag }))
        setApplications(mappedServices)
        setTagsData(mappedTags)
    }, [services, tags])

    return (
        <>
            <Modal
                title="Generate Token"
                open={isModalOpen}
                onCancel={handleClose}
                footer={null}
                centered
            >
                <div className="p-4 rounded border">
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>

                        <Form.Item name="type">
                            <Radio.Group
                                options={radioOptions}
                                onChange={(e) => setType(e.target.value)}
                                value={type}
                                defaultValue={'service_ids'}
                                optionType="button"
                                buttonStyle="solid"
                            />
                        </Form.Item>


                        <Form.Item
                            name={type}
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
                                maxTagCount={4}
                            />
                        </Form.Item>


                        <Form.Item
                            name="label"
                            label="Token label"
                            rules={[{ required: true, message: "Please enter the token label" }]}
                        >
                            <Input placeholder="Enter token name" className="w-full" />
                        </Form.Item>

                        <Form.Item
                            name="expiry_date"
                            label="Expiry Date"
                            rules={[
                                { required: true, message: 'Please select expiry date' }
                            ]}
                        >
                            <DatePicker
                                className="w-full"
                                disabledDate={disabledPreviousDates}
                                format={'YYYY-MM-DD'}
                            />
                        </Form.Item>

                        <Form.Item>
                            <div className="flex justify-end gap-2">
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="primary" htmlType="submit" loading={isPending}>
                                    Generate Token
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <Modal onCancel={handleClose} visible={showCopyDialog.visible} title='Copy token' footer={null} centered>
                <Input
                    value={showCopyDialog.token}
                    readOnly
                    suffix={
                        <Tooltip title='Copy token'>
                            <CopyOutlined
                                onClick={handleCopyClick}
                                style={{ cursor: 'pointer' }}
                            />
                        </Tooltip>
                    }
                />
            </Modal>
        </>
    );
};
