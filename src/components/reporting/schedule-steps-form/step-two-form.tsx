import React, { useState } from 'react';
import { Form, Button, Tag, Input, Tooltip } from 'antd';
import { MultiSelect } from '@/components/atomic-components/multi-select';
import { useGetSmtp } from '@/queries/settings';
import { emailRegex } from '@/utils/common-utils';
import { StepTwoFormProps } from '@/interfaces/reporting-interface';

export const StepTwoForm: React.FC<StepTwoFormProps> = ({
    formData,
    stepTwoForm,
    updateFormData,
    navigateToStep,
    
}) => {
    const [inputEmail, setInputEmail] = useState('');
    const { data: smtpList } = useGetSmtp({})

    const handleEmailRemove = (emailToRemove: string) => {
        updateFormData({
            emails: formData.emails.filter(email => email !== emailToRemove)
        });
    };

    const handleAddEmail = (e:any) => {        
        if (e.keyCode==13 && emailRegex.test(inputEmail) && !formData.emails.includes(inputEmail)) {
            updateFormData({
                emails: [...formData.emails, inputEmail]
            });
            setInputEmail(''); 
        }
    };

    return (
        <Form
            layout="vertical"
            form={stepTwoForm}
            initialValues={{
                emails: formData.emails,
                smtp_id: formData.smtp_id
            }}
            onFinish={(values) => navigateToStep(2, stepTwoForm)}
            className='border p-4 rounded'
        >
            {/* Email Input Section */}
            <Form.Item label="Email">
                <div className="flex">
                    <Tooltip title='Press enter to confirm'>
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

                {/* Displayed Emails */}
                <div className="mt-2">
                    {formData.emails.map((email) => (
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

            {/* SMTP Provider Selection */}
            <Form.Item
                label="Select SMTP"
                name="smtp_id"
                rules={[{ required: true, message: 'Please select SMTP' }]}
            >
                <MultiSelect
                    options={
                        smtpList?.users?.map((smtp: any) => ({ label: smtp.provider_name, value: smtp.id }))
                    }
                    placeholder={`Select SMTP`}
                    isLoading={false}
                    maxTagCount={4}
                    mode='single'
                    onChange={(value) => updateFormData({ smtp_id: value })}
                    defaultValue={stepTwoForm.getFieldValue('smtp_id')}
                />
            </Form.Item>

            {/* Navigation Buttons */}
            <Form.Item>
                <div className="flex justify-between">
                    <Button onClick={() => navigateToStep(0)}>
                        Back
                    </Button>
                    <Button type="primary" htmlType='submit'>
              Next
            </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

