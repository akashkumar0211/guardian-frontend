import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Checkbox, message, Row, Col } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useAddSmtp, useUpdateSmtp } from '@/queries/settings';
import { settingsSubject } from '@/event-emitters/event-emitters';
import { SMTPInitialState } from '@/constants/settings-constants';
import { SMTPDialogProps } from '@/interfaces/settings-interface';

export const SMTPDialog: React.FC<SMTPDialogProps> = ({ isModalOpen, setIsModalOpen, smtpData = null }) => {
    const [form] = useForm();
    const { mutate: addSmtp, isPending } = useAddSmtp();
    const { mutate: updateSmtp, isPending: isUpdating } = useUpdateSmtp();

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const smtpHandlerFunction = smtpData ? updateSmtp : addSmtp
    const handleFinish = (payload: typeof SMTPInitialState) => {
        smtpHandlerFunction(payload, {
            onSuccess: (smtp: any) => {
                message.success(`SMTP settings ${smtpData ? 'updated' : 'saved'} successfully!`);
                settingsSubject.next({ action: smtpData ? 'smtpUpdated' : 'smtpAdded', smtp })
                handleCancel()
            },
            onError: (error) => {
                console.error("Failed to add or update smtp:", error);
                message.error(`Error ${smtpData ? 'updating' : 'adding'} SMTP!`)
            },
        })
    };


    useEffect(() => {
        if (smtpData) {
            form.setFieldsValue({
                provider_name: smtpData.provider_name,
                email: smtpData.email,
                host: smtpData.host,
                port: smtpData.port,
                username: smtpData.username,
                password: smtpData.password,
                auth: smtpData.auth,
                start_tls: smtpData.start_tls,
            })
        }

    }, [smtpData])


    return (
        <Modal
            title="SMTP Settings"
            visible={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={600}
            className="p-6"
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={SMTPInitialState}
                onFinish={handleFinish}
                className='border p-4 rounded'
            >
                <Row gutter={[16, 8]}>
                    <Col span={12}>
                        <Form.Item
                            name="provider_name"
                            label="Provider Name"
                            rules={[{ required: true, message: 'Please enter the provider name' }]}
                        >
                            <Input placeholder="Enter Provider Name" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
                        >
                            <Input placeholder="Enter Email Address" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="host"
                            label="Host"
                            rules={[{ required: true, message: 'Please enter the host' }]}
                        >
                            <Input placeholder="Enter Host" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="port"
                            label="Port"
                            rules={[{ required: true, message: 'Please enter the port' }]}
                        >
                            <Input placeholder="Enter Port" type="number" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true, message: 'Please enter the username' }]}
                        >
                            <Input placeholder="Enter Username" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please enter the password' }]}
                        >
                            <Input.Password placeholder="Enter Password" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name="auth" valuePropName="checked">
                            <Checkbox>Enable Authentication</Checkbox>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name="start_tls" valuePropName="checked">
                            <Checkbox>Enable Start TLS</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>

                <div className="flex justify-between space-x-4 mt-4">
                    <Button onClick={handleCancel} className="bg-gray-200 text-black hover:bg-gray-300">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" loading={isPending || isUpdating}>
                        Save
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};
