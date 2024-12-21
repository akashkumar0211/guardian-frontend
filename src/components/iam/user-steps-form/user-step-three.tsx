import { ROLES_PERMISSIONS } from "@/constants/iam-constants";
import { useGetRoles } from "@/queries/iam";
import { Form, Radio } from "antd";
import { useEffect, useState } from "react";

export const UserStepThree = ({ stepThreeForm,selectedRole,setSelectedRole }: { stepThreeForm: any,selectedRole:any,setSelectedRole:any }) => {
    const { data: rolesResponse, isLoading: isRolesLoading } = useGetRoles({});

    const handleRoleChange = (value: string) => {
        setSelectedRole(value);
    };
    // Use Form's built-in state management
    const [form] = Form.useForm(stepThreeForm);

    if (isRolesLoading) {
        return <span>Loading.....</span>;
    }

    const rolesData = rolesResponse?.roles || [];

    return (
        <div className="p-4">
            <Form form={form}>
                <Form.Item
                    name="roles"
                    rules={[{
                        required: true,
                        message: 'Please select at least one role'
                    }]}
                >
                    <Radio.Group onChange={(e) => handleRoleChange(e.target.value)} value={selectedRole}>
                        <div className="grid grid-cols-3 gap-2">
                            {rolesData.map(({ role }: any, index: number) => {
                                return (
                                    <div key={index} className="border p-4 rounded-md bg-gray-50 hover:bg-gray-100 transition">
                                        <>
                                            <Radio value={role?.casId} >
                                                <div className="flex items-start w-full">
                                                    <h4 className="font-bold truncate">{role?.display_name}</h4>
                                                </div>

                                            </Radio>
                                            <RadioContent index={index} role={role} />
                                        </>
                                    </div>
                                );
                            })}
                        </div>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </div >
    );
}

const RadioContent = ({ index, role }: { index: number, role: any }) => (
    <>
        <div className="pl-4">
            {ROLES_PERMISSIONS[role?.display_name]?.permissions?.map((permission: string, permIndex: number) => (
                <p key={permIndex} className="text-sm text-gray-500">
                    • {permission}
                </p>
            ))}
        </div>
    </>

)