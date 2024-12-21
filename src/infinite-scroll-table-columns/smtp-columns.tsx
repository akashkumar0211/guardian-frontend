import React from "react";
import { ColumnsType } from "antd/es/table";
import { Button, message, Tooltip } from "antd";
import { Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { settingsSubject } from "@/event-emitters/event-emitters";
import { useDeleteSmtp } from "@/queries/settings";

export const smtpColumns: ColumnsType<any> = [
    {
        title: "Provider",
        dataIndex: "provider_name",
        key: "provider_name",
    },

    {
        title: "Host",
        dataIndex: "host",
        key: "host",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    }
    , {
        title: "Actions",
        key: "actions",
        render: (_: any, record: any) => (
            <ActionsCell record={record} />
        ),
    },
];

const ActionsCell = ({ record }: { record: any }) => {
    const { mutate: deleteSmtp } = useDeleteSmtp();

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <Tooltip title="Edit SMTP" placement="bottom">
                <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => settingsSubject.next({ action: 'editSmtp', smtp: record })}
                />
            </Tooltip>
            <Popconfirm
                title="Are you sure to delete this smtp config?"
                onConfirm={() => deleteSmtp(record.id,{
                    onSuccess: () => {
                        message.success("Smtp Deleted Successfully!")
                        settingsSubject.next({action:'smtpDeleted',smtp_id:record.id})
                      },
                      onError: (error:any) => {
                        console.error("Failed to delete Smtp:", error);
                        message.error("Error deleting smtp!")
                      },
                })}
                okText="Yes"
                cancelText="No"
            >
                <Tooltip title="Delete Smtp" placement="bottom">
                    <Button type="link" icon={<DeleteOutlined />} danger />
                </Tooltip>
            </Popconfirm>
        </div>
    );
};
