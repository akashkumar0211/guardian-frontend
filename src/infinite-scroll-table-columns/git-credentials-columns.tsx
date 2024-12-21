import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { GitCredentialRow } from '@/interfaces/integrations-interface';
import { Button, message, Image, Tooltip } from "antd";
import { Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { integrationsSubject } from "@/event-emitters/event-emitters";
import { TextOverflowCheck } from "@/components/atomic-components/text-overflow-check";
import { useDeleteGitCredential } from '@/queries/integrations';

export const gitColumns: ColumnsType<GitCredentialRow> = [
    {
        title: 'Provider',
        dataIndex: 'provider',
        key: 'provider',
        width: '20%',
        render: (provider, record) => (
            <Tooltip
                title={provider?.toUpperCase()}
                placement="right"
            >
                <Image
                    src={`/${provider?.charAt(0).toUpperCase() + provider?.slice(1)}.svg`}
                    alt={provider}
                    height={19}
                    width={19}
                    preview={false}
                    className="object-contain"
                />
            </Tooltip>
        )
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '45%',
        render: (name) => (
            <TextOverflowCheck>{name}</TextOverflowCheck>
        )
    },
    {
        title: 'Owner',
        dataIndex: 'owner',
        key: 'owner',
        width: '45%',
        render: (owner) => (
            <TextOverflowCheck>{owner || '-'}</TextOverflowCheck>
        )
    }, {
        title: "Actions",
        key: "actions",
        width: '45%',
        render: (_: any, record: any) => (
            <ActionsCell record={record} />
        ),
    },
];

const ActionsCell = ({ record }: { record: any }) => {
    const { mutate: deleteGitCredential } = useDeleteGitCredential();

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <Tooltip title="Edit Git" placement="bottom">
                <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => integrationsSubject.next({ action: 'editGit', git: record })}
                />
            </Tooltip>
            <Popconfirm
                title="Are you sure to delete this git?"
                onConfirm={() => deleteGitCredential(record.name, {
                    onSuccess: () => {
                        message.success("Git Deleted Successfully!")
                        integrationsSubject.next({ action: 'gitDeleted', policy_id: record.name })
                    },
                    onError: (error: any) => {
                        console.error("Failed to delete git:", error);
                        message.error("Error deleting git!")
                    },
                })}
                okText="Yes"
                cancelText="No"
            >
                <Tooltip title="Delete Git" placement="bottom">
                    <Button type="link" icon={<DeleteOutlined />} danger />
                </Tooltip>
            </Popconfirm>
        </div>
    );
};
