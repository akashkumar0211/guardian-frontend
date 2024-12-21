'use client'
import React, { useEffect, useState } from 'react';
import { Modal, Form, Steps, Button, message } from 'antd';
import { UserCreationDialogProps } from '@/interfaces/iam-interface';
import { UserStepTwo } from './user-steps-form/user-step-two';
import { UserStepThree } from './user-steps-form/user-step-three';
import { UserStepOne } from './user-steps-form/user-step-one';
import { useAddUser, useUpdateUser } from '@/queries/iam';
import { iamSubject } from '@/event-emitters/event-emitters';

export const UserCreationDialog: React.FC<UserCreationDialogProps> = ({ isModalOpen, setIsModalOpen, editUserData }) => {    
    const [stepOneForm] = Form.useForm<any>();
    const [stepTwoForm] = Form.useForm<any>();
    const [stepThreeForm] = Form.useForm<any>();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<any>()
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    const { mutate: addNewUser, isPending } = useAddUser()
    const { mutate: updateUser, isPending:isUpdating } = useUpdateUser()


    const handleNext = async () => {
        try {
            if (currentStep === 0) {
                setFormData((prev: any) => ({ ...prev, ...stepOneForm.getFieldsValue() }))
                await stepOneForm.validateFields(['name', 'email', 'password', 'confirmPassword']);
            } else if (currentStep === 1) {
                setFormData((prev: any) => ({ ...prev, ...stepTwoForm.getFieldsValue() }))
                await stepTwoForm.validateFields(['teams']);
            }
            setCurrentStep(current => current + 1);
        } catch (error) {
            message.error('Please select at least one role');
        }
    };

    const handleSubmit = () => {
        stepThreeForm.validateFields()
            .then(values => {
                formData['roles'] = [values['roles']]
                formData['email']=editUserData['email']
                formData['name']=editUserData['name']
                if(editUserData){
                    formData['_id']=editUserData['_id']
                }                
                const userHandlerFunction=editUserData?updateUser:addNewUser
                userHandlerFunction(formData, {
                    onSuccess: (user) => {
                        message.success(`User ${editUserData?'updated':'created'} successfully!`);
                        iamSubject.next({ action: editUserData?'userUpdated':'newUserAdded', user })
                        handleClose()
                    },
                    onError: (error) => {
                        console.error("user add editing error", error);
                        message.error(`Error ${editUserData?'updating':'creating'} user!`);
                    }
                })
            }).catch((error) => {
                message.error("Please fill all required fields")
            })
    };

    const handleBack = () => {
        setCurrentStep((prev) => prev - 1)
    }

    const handleClose = () => {
        stepOneForm.resetFields()
        stepTwoForm.resetFields()
        stepThreeForm.resetFields()
        setSelectedRole('')
        setSelectedTeams([])
        setIsModalOpen({ type: '', open: false })
    }

    let steps = [
        { title: 'General', content: <UserStepOne stepOneForm={stepOneForm} /> },
        { title: 'Teams', content: <UserStepTwo stepTwoForm={stepTwoForm} setSelectedTeams={setSelectedTeams} selectedTeams={selectedTeams} /> },
        { title: 'Roles', content: <UserStepThree stepThreeForm={stepThreeForm} setSelectedRole={setSelectedRole} selectedRole={selectedRole} /> }
    ];

    useEffect(() => {
        console.log("editUserDatssa",editUserData);
        
        if (editUserData) {
            steps.unshift()
            console.log(editUserData);
            let roles=editUserData?.roles?.map(({role}:{role:any})=>role.casId)
            console.log("roless",roles);
            setCurrentStep(1)
            setSelectedTeams(editUserData['teams'].map((team: any) => team.casId))
            stepTwoForm.setFieldValue('teams',editUserData['teams'].map((team: any) => team.casId))
            setSelectedRole(roles)
            stepThreeForm.setFieldValue('roles',roles[0])
        }
    }, [editUserData])

    return (
        <div>
            
            <Modal
                title={editUserData ? "Edit User" : "Create New User"}
                open={isModalOpen}
                width={currentStep == 2 ? 1000 : 700}
                onCancel={handleClose}
                footer={null}
            >
                <Steps current={currentStep} className="mb-4">
                    {steps.map(item => (
                        <Steps.Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className='border mt-2 p-4 rounded'>
                    {steps[currentStep].content}
                    <div className='flex justify-end items-center gap-4'>
                        {currentStep > (editUserData ? 1 : 0) && <Button
                            // type="primary"
                            onClick={handleBack}
                        >
                            Back
                        </Button>}
                        <Button
                            key="submit"
                            htmlType='submit'
                            type='primary'
                            onClick={currentStep == 2 ? handleSubmit : handleNext}
                            loading={isUpdating || isPending}
                        >
                            {currentStep == 2 ? (editUserData ? "Update User" : 'Create User') : 'Next'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};