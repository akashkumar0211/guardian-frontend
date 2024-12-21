import React from "react";
import { ColumnsType } from "antd/es/table";
import {  EditOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { integrationsSubject } from "@/event-emitters/event-emitters";

export const configureAIColumns: ColumnsType<any> = [
    {
        title: "Label",
        dataIndex: "label",
        key: "label",
    },
    {
        title: "Created Date",
        dataIndex: "CreatedDate",
        key: "CreatedDate",
        render: (date: string) => date.split("T")[0], // Format the date
    },
    {
        title: "Created By",
        dataIndex: "CreatedBy",
        key: "CreatedBy",
        render: (value: string) => value || '-', // Format the date
    },
    {
        title: "Actions",
        key: "actions",
        render: (_: any, record: any) => (
            <ActionsCell record={record} />
        ),
    },
];

const ActionsCell = ({ record }: { record: any }) => {
    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <Tooltip title="Edit Token" placement="bottom">
                <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => integrationsSubject.next({ action: 'editAiToken', token: record })}
                />
            </Tooltip>
            <Popconfirm
                title="Are you sure to delete this token?"
                onConfirm={() => integrationsSubject.next({action:'deleteToken',token:record})}
                okText="Yes"
                cancelText="No"
            >
                <Tooltip title="Delete Token" placement="bottom">
                    <Button type="link" icon={<DeleteOutlined />} danger />
                </Tooltip>
            </Popconfirm>
        </div>
    );
};