// 'use client'
import React from "react";
import { Button, message, Popconfirm, Tag, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { iamSubject } from "@/event-emitters/event-emitters";
import { permissonColors } from "@/constants/iam-constants";
import { useDeleteUser } from "@/queries/iam";

export const userTableColumns: any= [
    {
        title: "User",
        dataIndex: "name",
        key: "name",
        width: 200,
        render: (text: string) => <div className="text-gray-900">{text}</div>,
    },
    {
        title: "Roles",
        dataIndex: "roles",
        key: "roles",
        width: 400,
        render: (roles: any[]) => {            
            return (
                <div className='flex items-center gap-2'>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', }}>
                        {roles.map(({role}) => (
                            <Tag
                                color={permissonColors[role['display_name']]}
                                key={role['display_name']}
                                style={{ margin: 0 }}
                            >
                                {}
                                {role['display_name']}
                            </Tag>
                        ))}
                    </div>
                </div>
            );
        },
    },
    {
        title: "Email ID",
        dataIndex: "email",
        key: "email",
        width: 300,
        render: (text: string) => <div className="text-gray-900">{text}</div>,
    },, {
        title: "Actions",
        key: "actions",
        width: 300,
        render: (_: any, record: any) => (
            <ActionsCell record={record} />
        ),
    },
];

const ActionsCell = ({ record }: { record: any }) => {    
    const { mutate: deleteUser } = useDeleteUser();

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <Tooltip title="Edit user" placement="bottom">
                <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => iamSubject.next({ action: 'editUser', user: record })}
                />
            </Tooltip>
            <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={() => deleteUser(record._id, {
                    onSuccess: () => {
                        message.success("user Deleted Successfully!")
                        iamSubject.next({ action: 'userDeleted', user_id: record._id })
                    },
                    onError: (error: any) => {
                        console.error("Failed to delete user:", error);
                        message.error("Error deleting user!")
                    },
                })}
                okText="Yes"
                cancelText="No"
            >
                <Tooltip title="Delete user" placement="bottom">
                    <Button type="link" icon={<DeleteOutlined />} danger />
                </Tooltip>
            </Popconfirm>
        </div>
    );
};
