import React from "react";
import { Button, message, Tag, Tooltip } from "antd";
import { Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { settingsSubject } from "@/event-emitters/event-emitters";
import { useDeletePolicy } from "@/queries/settings";
import { TextOverflowCheck } from "@/components/atomic-components/text-overflow-check";
import { VulnerabilityItem } from "@/interfaces/settings-interface";
import { severityColors } from "@/constants/settings-constants";

export const PolicyColumns: any = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (name: string) => (
            <TextOverflowCheck>
                {name || '-'}
            </TextOverflowCheck>
        )
    },
    {
        title: 'Vulnerabilities',
        dataIndex: 'severityResult',
        key: 'severityResult',
        render: (severityResult: VulnerabilityItem[]) => {
            return <>
                <div className='flex items-center gap-2'>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', }}>
                        {severityResult.map(({ count, severity }) => (
                            <Tag
                                color={severityColors[severity]}
                                key={severity}
                                style={{ margin: 0 }}
                            >
                                {severity}: {count}
                            </Tag>
                        ))}
                    </div>
                </div>
            </>;
        }
    },
    , {
        title: "Actions",
        key: "actions",
        render: (_: any, record: any) => (
            <ActionsCell record={record} />
        ),
    },
];

const ActionsCell = ({ record }: { record: any }) => {
    const { mutate: deletePolicy } = useDeletePolicy();

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <Tooltip title="Edit Policy" placement="bottom">
                <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => settingsSubject.next({ action: 'editPolicy', policy: record })}
                />
            </Tooltip>
            <Popconfirm
                title="Are you sure to delete this policy?"
                onConfirm={() => deletePolicy(record.id, {
                    onSuccess: () => {
                        message.success("Policy Deleted Successfully!")
                        settingsSubject.next({ action: 'policyDeleted', policy_id: record.id })
                    },
                    onError: (error: any) => {
                        console.error("Failed to delete policy:", error);
                        message.error("Error deleting policy!")
                    },
                })}
                okText="Yes"
                cancelText="No"
            >
                <Tooltip title="Delete Policy" placement="bottom">
                    <Button type="link" icon={<DeleteOutlined />} danger />
                </Tooltip>
            </Popconfirm>
        </div>
    );
};
