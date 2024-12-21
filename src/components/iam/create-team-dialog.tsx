import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import { MultiSelect } from "../atomic-components/multi-select";
import { useServices } from "@/queries/dashboard";
import { reportingSubject } from "@/event-emitters/event-emitters";
import { TeamDialogProps } from "@/interfaces/iam-interface";
import { useAddTeam, useUpdateTeam } from "@/queries/iam";

export const TeamDialog: React.FC<TeamDialogProps> = ({ isModalOpen, setIsModalOpen, selectedApplications, setSelectedApplications,editTeamData,setEditTeamData }) => {
    
    const [applications, setApplications] = useState<any>([])

    const { mutate: addTeam, isPending } = useAddTeam()
    const { mutate: updateTeam, isPending: isUpdating } = useUpdateTeam()


    const [form] = Form.useForm();
    const { data: services } = useServices({}, isModalOpen)


    const handleClose = () => {
        form.resetFields()
        setIsModalOpen((prev: any) => ({ ...prev, open: false }));
        setSelectedApplications(null)
        setEditTeamData(null)
    };

    const handleSubmit = (formData: any) => {        
        const teamHandler = editTeamData?.['name'] ? updateTeam : addTeam
        if(editTeamData?.['name']){
            formData['name']=editTeamData['name']
        }
        teamHandler(formData, {
            onSuccess: (team: any) => {
                message.success(`Team ${selectedApplications ? 'Updated' : 'Added'} Successfully!`)
                reportingSubject.next({ action: selectedApplications ? 'teamUpdated' : 'teamAdded', team })
                handleClose();
            },
            onError: (error) => {
                console.error("Failed to add or update team:", error);
                message.error(`Error ${selectedApplications ? 'updating' : 'adding'} team!`)
            },
        });
    };

    useEffect(() => {
        // Map services to the options format
        const mappedServices = services?.map((service: any) => ({
            label: service.serviceName,
            value: service.id,
        }));
        setApplications(mappedServices);
        console.log("here app",selectedApplications);
        
    
        // Set form value to selected applications (if editing), or leave empty
        if (editTeamData?.['name']) {
            form.setFieldValue('applications', selectedApplications);
        } else {
            form.resetFields(['applications']);
        }
    }, [services, editTeamData, form]);

    return (
        <>
            <Modal
                title={editTeamData?.['name']?'Update Team':'Create Team'}
                open={isModalOpen}
                onCancel={handleClose}
                footer={null}

            >
                <div className="p-4 border rounded">
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>

                        {!editTeamData?.['name'] && <Form.Item
                            name="name"
                            label="Team Name"
                            rules={[{ required: true, message: "Please enter the team name" }]}
                        >
                            <Input placeholder="Enter team name" className="w-full" />
                        </Form.Item>}

                        <Form.Item
                            name={'applications'}
                            label={`Select Applications`}
                            rules={[
                                {
                                    required: true,
                                    message: `Please select at least one application`,
                                },
                            ]}
                        >
                            <MultiSelect
                                options={applications}
                                placeholder={`Select Applications`}
                                isLoading={false}
                                maxTagCount={4}
                                defaultValue={selectedApplications}
                                onChange={(val: any) => setSelectedApplications(val)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <div className="flex justify-end gap-2">
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="primary" htmlType="submit" loading={isPending}>
                                    {editTeamData?.['name']?'Update':'Create Team'} 
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};
