import React  from "react";
import { ColumnsType } from "antd/es/table";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, message, Tooltip } from "antd";
import { handleDownloadPDF } from "@/utils/common-utils";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteReport } from "@/queries/reporting";
import { reportingSubject } from "@/event-emitters/event-emitters";

export const reportsColumns: ColumnsType<any> = [
    {
        title: "Report Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Created Date",
        dataIndex: "created_date",
        key: "created_date",
        render: (date: string) => date.split("T")[0], // Format the date
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
    const { mutate: deleteReport } = useDeleteReport(); // Use the custom hook here

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <Tooltip title="Download Report" placement="bottom">
                <Button
                    type="link"
                    icon={<DownloadOutlined />}
                    onClick={() => handleDownloadPDF(record.report_url)}
                />
            </Tooltip>
            <Popconfirm
                title="Are you sure to delete this report?"
                onConfirm={() => deleteReport(record.id,{
                    onSuccess: () => {
                        message.success("Report Deleted Successfully!")
                        reportingSubject.next({action:'reportDeleted',report_id:record.id})
                      },
                      onError: (error) => {
                        console.error("Failed to delete report:", error);
                        message.error("Error deleting report!")
                      },
                })}
                okText="Yes"
                cancelText="No"
            >
                <Tooltip title="Delete Report" placement="bottom">
                    <Button type="link" icon={<DeleteOutlined />} danger />
                </Tooltip>
            </Popconfirm>
        </div>
    );
};