import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Input, Button, Form, DatePicker, TimePicker} from 'antd';

import { MultiSelect } from '@/components/atomic-components/multi-select';
import { disabledPreviousDates } from '@/utils/common-utils';
import { StepThreeFormProps } from '@/interfaces/reporting-interface';
dayjs.extend(isoWeek);

export const StepThree: React.FC<StepThreeFormProps> = ({ 
    onSubmit, 
    onBack, 
    stepThreeForm,
    updateFormData,
    initialData ,
    isLoading
}) => {
    const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');

    useEffect(() => {
        if (initialData) {
            const initialFrequency = initialData.type || 'daily';
            setFrequency(initialFrequency);

            const formValues:any = {
                start_date: initialData.start_date ? dayjs(initialData.start_date) : null,
                end_date: initialData.end_date ? dayjs(initialData.end_date) : null,
                frequency: initialFrequency,
                time: initialData.time ? dayjs(initialData.time, 'HH:mm') : null,
            };

            if (initialFrequency === 'weekly') {
                formValues['day'] = initialData.day;
            } else if (initialFrequency === 'monthly') {
                formValues['month'] = initialData.month;
            }

            stepThreeForm.setFieldsValue(formValues);
        }
    }, [initialData]);

    const handleFrequencyChange = (value: any) => {
        const newFrequency = value as 'daily' | 'weekly' | 'monthly';
        setFrequency(newFrequency);
        updateFormData({frequency:newFrequency})

        stepThreeForm.setFieldsValue({ 
            day: undefined, 
            month: undefined 
        });
    };

    const handleSubmit = (values: any) => {
        const finalData = {
            ...values,
            start_date: values.start_date.format('YYYY-MM-DD'),
            end_date: values.end_date.format('YYYY-MM-DD'),
            time: values.time.format('HH:mm')
        };

        if (finalData.frequency === 'weekly') {
            finalData.day = values.day;
        } else if (finalData.frequency === 'monthly') {
            finalData.month = values.month;
        }
        
        onSubmit(finalData);
    };

    return (
        <Form
            form={stepThreeForm}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ frequency: 'daily' }}
            className='border p-4 rounded'
        >
            <div className="grid grid-cols-2 gap-4">
                <Form.Item
                    name="start_date"
                    label="Start Date"
                    rules={[
                        { required: true, message: 'Please select a start date' }
                    ]}
                >
                    <DatePicker 
                        className="w-full" 
                        disabledDate={disabledPreviousDates}
                        onChange={(start_date)=>updateFormData({start_date})}
                        value={stepThreeForm.getFieldValue('start_date')}
                    />
                </Form.Item>

                <Form.Item
                    name="end_date"
                    label="End Date"
                    
                    dependencies={['start_date']}
                    rules={[
                        { required: true, message: 'Please select an end date' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const startDate = getFieldValue('start_date');
                                if (!value || !startDate) {
                                    return Promise.resolve();
                                }
                                return value.isAfter(startDate)
                                    ? Promise.resolve()
                                    : Promise.reject(new Error('End date must be after start date'));
                            },
                        }),
                    ]}
                >
                    <DatePicker 
                        className="w-full" 
                        disabledDate={disabledPreviousDates}
                        onChange={(end_date)=>updateFormData({end_date})}
                        value={stepThreeForm.getFieldValue('end_date')}
                    />
                </Form.Item>

                {/* Frequency */}
                <Form.Item
                    name="frequency"
                    label="Frequency"
                    rules={[{ required: true, message: 'Please select frequency' }]}
                >
                    <MultiSelect
                        options={[
                            { label: 'Daily', value: 'daily' },
                            { label: 'Weekly', value: 'weekly' },
                            { label: 'Monthly', value: 'monthly' }
                        ]}
                        placeholder="Select Frequency"
                        mode="single"
                        onChange={handleFrequencyChange}
                        defaultValue={stepThreeForm.getFieldValue('frequency')}
                    />
                </Form.Item>

                {/* Time */}
                <Form.Item
                    name="time"
                    label="Time"
                    rules={[{ required: true, message: 'Please select a time' }]}
                >
                    <TimePicker 
                        className="w-full" 
                        format="HH:mm" 
                        onChange={(time)=>updateFormData({time})}
                        value={stepThreeForm.getFieldValue('time')}
                    />
                </Form.Item>
            </div>

            {/* Conditional Fields */}
            {frequency === 'weekly' && (
                <Form.Item
                    name="day"
                    label="Select Day"
                    rules={[{ required: true, message: 'Please select a day' }]}
                >
                    <MultiSelect
                        options={[...Array(7)].map((_, index) => ({
                            value: index + 1,
                            label: dayjs().isoWeekday(index + 1).format('dddd')
                        }))}
                        placeholder="Select Day"
                        mode="single"
                        defaultValue={stepThreeForm.getFieldValue('day')}
                        onChange={(val)=>updateFormData({day:val})}
                    />
                </Form.Item>
            )}

            {frequency === 'monthly' && (
                <Form.Item
                    name="month"
                    label="Date of Month"
                    rules={[
                        { required: true, message: 'Please select a date' },
                        {
                            validator: (_, value) => 
                                value > 0 && value <= 31
                                    ? Promise.resolve()
                                    : Promise.reject(new Error('Please enter a valid date (1-31)'))
                        }
                    ]}
                >
                    <Input 
                        type="number" 
                        min={1} 
                        max={31} 
                        placeholder="Enter date (1-31)" 
                        value={stepThreeForm.getFieldValue('month')}
                        onChange={(e)=>updateFormData({month:e.target.value})}
                    />
                </Form.Item>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
                <Button onClick={onBack}>Back</Button>
                <Button type="primary" htmlType="submit"  loading={isLoading}>
                    Submit
                </Button>
            </div>
        </Form>
    );
};