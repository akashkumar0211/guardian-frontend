import { reportingSubject } from "@/event-emitters/event-emitters";
import { useDeleteSchedule } from "@/queries/reporting";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, Popconfirm, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";

export const scheduleColumns: ColumnsType<any> = [
    {
        title: "Name",
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
    const { mutate: deleteSchedule } = useDeleteSchedule(); // Use the custom hook here

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <Popconfirm
                title="Are you sure to delete this schedule?"
                onConfirm={() => deleteSchedule(record.id,{
                    onSuccess: () => {
                        message.success("Schedule Deleted Successfully!")
                        reportingSubject.next({action:'scheduleDeleted',schedule_id:record.id})
                      },
                      onError: (error) => {                        
                        console.error("Failed to delete schedule:", error);
                        message.error("Error deleting schedule!")
                      },
                })}
                okText="Yes"
                cancelText="No"
            >
                <Tooltip title="Delete Schedule" placement="bottom">
                    <Button type="link" icon={<DeleteOutlined />} danger />
                </Tooltip>
            </Popconfirm>
        </div>
    );
};
