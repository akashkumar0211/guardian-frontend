import React from 'react';
import { Typography, Tooltip, Tag, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, RobotOutlined, SyncOutlined, GithubOutlined, ToolOutlined } from '@ant-design/icons'
import { useRouter,usePathname } from 'next/navigation';
import { VulnerabilityItem } from '@/interfaces/settings-interface';
import { severityColors } from '@/constants/settings-constants';
import { durationFormatter } from '@/utils/common-utils';
import { applicationSubject } from '@/event-emitters/event-emitters';

interface ColumnProps {
    application: string[];
    lastScanned: string | null;
    vulnerabilities: { severity: string; count: number }[];
    tagging: [string[], string];
}

export const applicationColumns: any = [
    {
        title: (
            <div className="flex items-center">
                <Typography.Text strong>Application</Typography.Text>
                <Button
                    type="text"
                    size="small"
                    //   icon={(!sortFilters.servicename || sortFilters.order === 'ASC') ? <ArrowUpOutlined />: <ArrowDownOutlined />}
                    className="ml-2"
                />
            </div>
        ),
        dataIndex: 'serviceName',
        key: 'serviceName',
        width: '150px',
        render: (value: string[],record:any) => {
            console.log("records",record);
            
            const pathname=usePathname()
            const router=useRouter()
            return <Tooltip title='View details'>
                <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                    router.push(`${pathname}/${record.id}`)
                }}
            >
                <span className="truncate">{value}</span>
                {/* <Image src="/Link.svg" alt="link" width={14} height={14} /> */}
            </div>
            </Tooltip>
        },
    },
    {
        title: (
            <div className="flex items-center">
                <Typography.Text strong>Last Scanned</Typography.Text>
                <Button
                    type="text"
                    size="small"
                //   icon={(!sortFilters.lastscan || sortFilters.order === 'ASC') ? <ArrowUpOutlined />: <ArrowDownOutlined />}
                //   className="ml-2"
                //   onClick={() => handleSortClick('lastscan')}
                />
            </div>
        ),
        width: '150px',
        dataIndex: 'lastScan',
        key: 'lastScan',
        render: (value: string | null) => durationFormatter(value)
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
    {
        title: 'Tagging',
        dataIndex: 'tags',
        key: 'tags',
        width: '250px',
        render: (tags: string[]) => {
            return (
                <div className="flex flex-wrap items-center space-x-2 gap-2">
                    {tags.map((tag: string, index: number) =>
                        <Tag
                            color="gray"
                            key={index}
                            style={{ margin: 0 }}
                        >
                            {tag}
                        </Tag>
                    )}
                </div>
            );
        },
    },
    , {
        title: "Actions",
        key: "actions",
        width: '200px',
        render: (_: any, record: any) => (
            <ActionsCell record={record} />
        ),
    },
];

const ActionsCell = ({ record }: { record: any }) => {
    // const { mutate: deleteTemplate } = useDeleteTemplate(); // Use the custom hook here

    return (
        <div style={{ display: "flex", gap: "4px" }}>
            <Tooltip title="Edit Tags" placement="bottom">
                <Button
                    type="link"
                    icon={<EditOutlined />}
                // onClick={() => reportingSubject.next({action:'editTemplate',template:record})}
                />
            </Tooltip>
            <Tooltip title="Configure Scanning Tool" placement="bottom">
                <Button
                    type="link"
                    icon={<ToolOutlined />}
                // onClick={() => reportingSubject.next({action:'editTemplate',template:record})}
                />
            </Tooltip>
            <Tooltip title="Configure AI" placement="bottom">
                <Button
                    type="link"
                    icon={<RobotOutlined />}
                // onClick={() => reportingSubject.next({action:'editTemplate',template:record})}
                />
            </Tooltip>
            <Tooltip title="Configure Git" placement="bottom">
                <Button
                    type="link"
                    icon={<GithubOutlined />}
                // onClick={() => reportingSubject.next({action:'editTemplate',template:record})}
                />
            </Tooltip>
            <Tooltip title="Sync" placement="bottom">
                <Button
                    type="link"
                    icon={<SyncOutlined />}
                // onClick={() => reportingSubject.next({action:'editTemplate',template:record})}
                />
            </Tooltip>
            <Popconfirm
                title="Are you sure to delete this application?"
                // onConfirm={() => deleteTemplate(record.id,{
                //     onSuccess: () => {
                //         message.success("Template Deleted Successfully!")
                //         reportingSubject.next({action:'templateDeleted',template_id:record.id})
                //       },
                //       onError: (error) => {
                //         console.error("Failed to delete template:", error);
                //         message.error("Error deleting template!")
                //       },
                // })}
                okText="Yes"
                cancelText="No"
            >
                <Tooltip title="Delete Application" placement="bottom">
                    <Button type="link" icon={<DeleteOutlined />} danger />
                </Tooltip>
            </Popconfirm>
        </div>
    );
};