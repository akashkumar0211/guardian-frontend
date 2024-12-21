import React, { useEffect } from 'react'
import { Button, Form, message, Modal } from 'antd'
import { AddAITokenDialogProps } from '@/interfaces/integrations-interface'
import { Input } from 'antd';
import { useAddAIToken, useUpdateAIToken } from '@/queries/integrations';
import { integrationsSubject } from '@/event-emitters/event-emitters';

export const AddAITokenDilog: React.FC<AddAITokenDialogProps> = ({ tokenData, isModalOpen, setIsModalOpen,setTokenData }) => {    
    const [form] = Form.useForm();
    const {mutate:addAIToken,isPending}=useAddAIToken()
    const {mutate:updateAiToken,isPending:isUpdating}=useUpdateAIToken()

    const handleFinish = (formData: any) => {
        formData['ai_name']=tokenData['id']
        if(tokenData['label']){
            formData['id']=tokenData['token_id']
        }
        const tokenHandlerFunction=tokenData['label']?updateAiToken:addAIToken
        tokenHandlerFunction(formData,{
            onSuccess: (aiToken: any) => {
                message.success(`Token ${tokenData['label']?'Updated':'Added'} Successfully!`)
                integrationsSubject.next({ action:tokenData['label']?'aiTokenUpdated': 'aiTokenAdded', aiToken })
                handleClose();
            },
            onError: (error) => {
                console.error("Failed to add or update aiToken:", error);
                message.error(`Error ${tokenData['label']?'updating':'adding'} token!`)
            },
        })
        // setFormValues(values);
    };
    const handleClose = () => {
        // setTokenData(null)
        form.resetFields()
        setIsModalOpen(false)
        setTokenData((prev:any)=>({...prev,label:'',token_id:''}))
    }

    useEffect(()=>{
        if(tokenData['label']){
            form.setFieldsValue(tokenData)
        }
    },[tokenData['label']])

    return (
        <Modal
            centered
            visible={isModalOpen}
            onCancel={handleClose}
            footer={null}
            width={700}
            title={`${tokenData['label']?'Edit':'Add'} token`}>
            <div className='border p-3 rounded'>
                <div style={{ maxWidth: 600, margin: "0 auto" }}>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFinish}
                        initialValues={{}}
                    >
                        <Form.Item
                            key={"label"}
                            label={"Label"}
                            name={"label"}
                            rules={[
                                { required: true, message: `Label is required` },
                            ]}
                        >
                            <Input
                                readOnly={tokenData?.['label']}
                                placeholder={`Enter label`}
                                type="text"
                            />
                        </Form.Item>
                        {tokenData?.api_token_fields?.map((field: any) => (
                            <Form.Item
                                key={field.key}
                                label={field.name}
                                name={field.key}
                                rules={[
                                    { required: true, message: `${field.name} is required` },
                                ]}
                            >
                                <Input
                                    placeholder={`Enter ${field.name}`}
                                    type="text"
                                />
                            </Form.Item>
                        ))}

                        {/* Submit Button */}
                        <Form.Item className='flex justify-end'>
                            <Button className='mr-0' type="primary" htmlType="submit" loading={isPending || isUpdating}>
                                {tokenData['label']?"Update":"Add"}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}
