import React, { useEffect, useState } from 'react';
import { Modal, Steps, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import {AppstoreAddOutlined,MailOutlined,ScheduleOutlined} from '@ant-design/icons';
import { useAddSchedule } from '@/queries/reporting';
import { reportingSubject } from '@/event-emitters/event-emitters';
import { StepThree } from './schedule-steps-form/step-three-form';
import { StepTwoForm } from './schedule-steps-form/step-two-form';
import { StepOneForm } from './schedule-steps-form/step-one-form';
import { ScheduleDialogProps } from '@/interfaces/reporting-interface';
import { defaultScheduleForm } from '@/constants/reporting-constants';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

const { Step } = Steps;

export const ScheduleDialog: React.FC<ScheduleDialogProps> = ({ isModalOpen, setIsModalOpen }) => {
    const [step, setStep] = useState(0);
    const [stepOneForm] = useForm();
    const [stepTwoForm] = useForm();
    const [stepThreeForm] = useForm();

    const [formData, setFormData] = useState<any>(defaultScheduleForm);

    const { mutate: addSchedule,isPending } = useAddSchedule()

    // Handle input changes for each step
    const updateFormData = (newData: any) => {
        setFormData((prev: any) => ({ ...prev, ...newData }));
    };

    // Handle step navigation with data preservation
    const navigateToStep = (newStep: number, formToValidate?: any) => {
        if (formToValidate) {
            formToValidate.validateFields()
                .then((values: any) => {
                    // Update form data with validated values
                    updateFormData(values);
                    setStep(newStep);
                })
                .catch((errorInfo: any) => {
                    console.error('Validation Failed:', errorInfo);
                });
        } else {
            setStep(newStep);
        }
    };

    // Prepare initial form values when modal opens or step changes
    useEffect(() => {
        if (isModalOpen) {
            // Set initial form values for each step
            stepOneForm.setFieldsValue({
                type: formData.type,
                name: formData.name,
                template_id: formData.template_id,
                applications: formData.applications,
                tags: formData.tags
            });

            stepTwoForm.setFieldsValue({
                emails: formData.emails,
                smtp_id: formData.smtp_id
            });

            stepThreeForm.setFieldsValue({
                start_date: formData.start_date,
                end_date: formData.end_date,
                frequency: formData.frequency,
                time: formData.time,
                day: formData.day,
                month: formData.month
            });
        }
    }, [step, isModalOpen]);

    // Final submission handler
    const handleFinalSubmit = (stepThreeData: any) => {
        const finalPayload = { ...formData, ...stepThreeData };
        if (finalPayload['type'] === 'applications') {
            finalPayload['service_ids'] = finalPayload['applications']
            delete finalPayload['applications']
        }else{
            delete finalPayload['tags']
        }
        finalPayload['type'] = stepThreeData['frequency']
        finalPayload[`${stepThreeData['frequency']}_frequency_option`] = {}

        if (stepThreeData['frequency'] !== 'daily') {
            finalPayload[`${stepThreeData['frequency']}_frequency_option`] = {
                time: stepThreeData['time'],
                [`day_of_${stepThreeData['frequency'].replace("ly", "")}`]:
                    stepThreeData['frequency'] === 'weekly' ?
                        Number(stepThreeData['day']) :
                        Number(stepThreeData['month'])
            }
        } else {
            finalPayload[`${stepThreeData['frequency']}_frequency_option`] = {
                time: stepThreeData['time']
            }
        }

        // Clean up payload
        delete finalPayload['frequency']
        delete finalPayload['time']
        delete finalPayload['day']
        delete finalPayload['month']
        delete finalPayload['applications']

        addSchedule(finalPayload, {
            onSuccess: (schedule: any) => {
                message.success("Schedule Added Successfully!")
                reportingSubject.next({ action: 'scheduleAdded', schedule })
                handleClose();
            },
            onError: (error) => {
                console.error("Failed to add schedule:", error);
                message.error("Error adding schedule!")
            },
        })
    };

    // Close and reset handler
    const handleClose = () => {
        // Reset all forms and state
        stepOneForm.resetFields();
        stepTwoForm.resetFields();
        stepThreeForm.resetFields();
        setFormData(defaultScheduleForm);
        setStep(0);
        setIsModalOpen(false);
    };

    return (
        <Modal
            title="Schedule Dialog"
            visible={isModalOpen}
            onCancel={handleClose}
            footer={null}
            width={800}
        >
            <Steps current={step} style={{ marginBottom: 40 }}>
                <Step title="General Info" icon={<AppstoreAddOutlined />} />
                <Step title="Send Email" icon={<MailOutlined />} />
                <Step title="Schedule" icon={<ScheduleOutlined />} />
            </Steps>

            {/* Step One Form */}
            {step === 0 && <StepOneForm
                formData={formData}
                step={step}
                stepOneForm={stepOneForm}
                updateFormData={updateFormData}
                navigateToStep={navigateToStep}
                handleClose={handleClose}
            />}
            {/* Step Two Form */}
            {step == 1 && <StepTwoForm formData={formData} stepTwoForm={stepTwoForm} updateFormData={updateFormData} navigateToStep={navigateToStep}
            />}

            {/* Step Three Form */}
            {step == 2 && <StepThree onSubmit={handleFinalSubmit} onBack={() => setStep(1)} stepThreeForm={stepThreeForm} updateFormData={updateFormData} isLoading={isPending}/>}
        </Modal>
    );
};