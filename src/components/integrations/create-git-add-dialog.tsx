import React, { useEffect, useState } from "react";
import { Modal, Radio, Button, Form, Input, message } from "antd";
import { gitRadioOptions } from "@/constants/settings-constants";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { GitDialogProps, GitFormData } from "@/interfaces/integrations-interface";
import { useAddGitCredentials, useUpdateGitCredentials } from "@/queries/integrations";
import { integrationsSubject } from "@/event-emitters/event-emitters";

export const GitDialog: React.FC<GitDialogProps> = ({ isModalOpen, setIsModalOpen,gitData,setGitData }) => {
    
    const [provider, setProvider] = useState("github");
    const [form] = Form.useForm();
    const { mutate: addGitCredentials, isPending } = useAddGitCredentials()
    const { mutate: updateGitCredentials, isPending:isUpdating } = useUpdateGitCredentials()


    const handleClose = () => {
        form.resetFields()
        setIsModalOpen(false);
        if(setGitData){
            setGitData(null)
        }
    };

    const handleSubmit = (formData: GitFormData) => {
        formData['provider'] = provider

        if(gitData){
            formData['id']=gitData['id']
            formData['access_token']=formData['private_access_token']
            delete formData['private_access_token']
            delete formData['provider']
        }
        let gitHandlerFunction=gitData?updateGitCredentials:addGitCredentials

        gitHandlerFunction(formData, {
            onSuccess: (git: any) => {
                message.success(`Credentials ${gitData?'Updated':'Added'} Successfully!`)
                integrationsSubject.next({ action:gitData?'gitUpdated': 'gitAdded', git })
                handleClose();
            },
            onError: (error) => {
                console.error("Failed to add or update git:", error);
                message.error(`Error ${gitData?'updating':'adding'} git!`)
            },
        });
    };

    useEffect(()=>{
        if(gitData){
            gitData['private_access_token']=gitData['access_token']
            delete gitData['access_token']
            form.setFieldsValue(gitData)
            setProvider(gitData['provider'])
        }
    },[gitData])

    return (
        <>
            <Modal
                title={`${gitData?'Update':'Add'} Git Credentials`}
                open={isModalOpen}
                onCancel={handleClose}
                footer={null}
                centered

            >
                <div className="border p-4 rounded">
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>

                        <Form.Item name="provider">
                            <Radio.Group
                                disabled={gitData}
                                options={gitRadioOptions}
                                onChange={(e) => setProvider(e.target.value)}
                                value={provider}
                                defaultValue={'github'}
                                optionType="button"
                                buttonStyle="solid"
                            />
                        </Form.Item>

                        <Form.Item
                            name="name"
                            label='Name'
                            rules={[{ required: true, message: "Please enter the name" }]}
                        >
                            <Input placeholder="Enter name" className="w-full" />
                        </Form.Item>


                        {provider === 'gitlab' && <Form.Item
                            name="url"
                            label='URL'
                            rules={[{ required: true, message: "Please enter the url" }]}
                        >
                            <Input placeholder="Enter URL" className="w-full" />
                        </Form.Item>}

                        {provider === 'github' && <Form.Item
                            name="owner"
                            label='Owner'

                            rules={[{ required: true, message: "Please enter the owner info" }]}
                        >
                            <Input placeholder="Enter Owner name" className="w-full" />
                        </Form.Item>}


                        <Form.Item
                            name="private_access_token"
                            label='Private Access Token'
                            rules={[{ required: true, message: "Please enter the token" }]}
                        >
                            <Input.Password
                                placeholder="Enter private access token"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>


                        <Form.Item>
                            <div className="flex justify-end gap-2">
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="primary" htmlType="submit" loading={isPending || isUpdating}>
                                   {gitData?"Update":"Add"} Credentials
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};
