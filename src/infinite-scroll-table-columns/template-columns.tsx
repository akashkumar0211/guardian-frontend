import React  from "react";
import { ColumnsType } from "antd/es/table";
import { Button, message, Tooltip } from "antd";
import { Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {  useDeleteTemplate } from "@/queries/reporting";
import { reportingSubject } from "@/event-emitters/event-emitters";

export const templateColumns: ColumnsType<any> = [
    {
        title: "Template Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Created Date",
        dataIndex: "created_date",
        key: "created_date",
        render: (date: string) => date.split("T")[0],
    },
    {
        title: "Created By",
        dataIndex: "created_by",
        key: "created_by",
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
    const { mutate: deleteTemplate } = useDeleteTemplate(); // Use the custom hook here

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <Tooltip title="Edit Template" placement="bottom">
                <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => reportingSubject.next({action:'editTemplate',template:record})}
                />
            </Tooltip>
            <Popconfirm
                title="Are you sure to delete this template?"
                onConfirm={() => deleteTemplate(record.id,{
                    onSuccess: () => {
                        message.success("Template Deleted Successfully!")
                        reportingSubject.next({action:'templateDeleted',template_id:record.id})
                      },
                      onError: (error) => {
                        console.error("Failed to delete template:", error);
                        message.error("Error deleting template!")
                      },
                })}
                okText="Yes"
                cancelText="No"
            >
                <Tooltip title="Delete Template" placement="bottom">
                    <Button type="link" icon={<DeleteOutlined />} danger />
                </Tooltip>
            </Popconfirm>
        </div>
    );
};