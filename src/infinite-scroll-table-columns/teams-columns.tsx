import React from "react";
import { Button, message, Popconfirm, Tag, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { iamSubject } from "@/event-emitters/event-emitters";
import { useDeleteTeam } from "@/queries/iam";


export const teamTableColumns: any= [
    {
        title: "User",
        dataIndex: "name",
        key: "name",
        width: 200,
        render: (text: string) => <div className="text-gray-900">{text}</div>,
    },
    {
        title: "Applications",
        dataIndex: "applications",
        key: "applications",
        width: 400,
        render: (applications: any[]) => {                        
            return (
                <div className='flex items-center gap-2'>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', }}>
                        {applications.map((app) => {
                            return app?.name?.length?<Tag
                            key={app?.['name']}
                            style={{ margin: 0 }}
                        >
                            {app['name']}
                        </Tag>:''
                        })}
                    </div>
                </div>
            );
        },
    },
    {
        title: "Actions",
        key: "actions",
        width: 300,
        render: (_: any, record: any) => (
            <ActionsCell record={record} />
        ),
    },
];

const ActionsCell = ({ record }: { record: any }) => {
    const { mutate: deleteTeam } = useDeleteTeam();

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <Tooltip title="Add applications" placement="bottom">
                <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => iamSubject.next({ action: 'editTeam', team: record })}
                />
            </Tooltip>
            <Popconfirm
                title="Are you sure to delete this team?"
                onConfirm={() => deleteTeam(record.casId, {
                    onSuccess: () => {
                        message.success("Team Deleted Successfully!")
                        iamSubject.next({ action: 'teamDeleted', team_id: record.casId })
                    },
                    onError: (error: any) => {
                        console.error("Failed to delete team:", error);
                        message.error("Error deleting team!")
                    },
                })}
                okText="Yes"
                cancelText="No"
            >
                <Tooltip title="Delete team" placement="bottom">
                    <Button type="link" icon={<DeleteOutlined />} danger />
                </Tooltip>
            </Popconfirm>
        </div>
    );
};
