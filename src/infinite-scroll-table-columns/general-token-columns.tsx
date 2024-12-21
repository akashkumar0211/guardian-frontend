import { settingsSubject } from '@/event-emitters/event-emitters';
import { Button, message, Popconfirm, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteToken } from '@/queries/settings';
import { TokenRecord } from '@/interfaces/settings-interface';

export const tokenColumns: ColumnsType<TokenRecord> = [
  {
    title: 'Labels',
    dataIndex: 'Label',
    key: 'labels',
    render: (text: string) => (
      <span className="text-gray-800">{text}</span>
    ),
    ellipsis: true,
  },
  {
    title: 'Created',
    dataIndex: 'CreatedAt',
    key: 'created',
    render: (date: string) => (
      <span className="text-gray-600">
        {date.split('T')[0]}
      </span>
    ),
    ellipsis: true,
  },
  {
    title: 'Expiry Date',
    dataIndex: 'ExpiryDate',
    key: 'expiry_date',
    render: (date: string) => (
      <span className="text-gray-600">
        {date.split('T')[0]}
      </span>
    ),
    ellipsis: true,
  },
  {
    title: 'Last Accessed',
    dataIndex: 'LastAccessed',
    key: 'last_accessed',
    render: (date: string) => (
      <span className="text-gray-600">
        {date.split('T')[0]}
      </span>
    ),
    ellipsis: true,
  },
  {
    title: "Actions",
    key: "actions",
    render: (_: any, record: any) => (
        <ActionsCell record={record} />
    ),
}

];


const ActionsCell = ({ record }: { record: any }) => {    
    const { mutate: deleteToken } = useDeleteToken();

    return (
        <div style={{ display: "flex", gap: "8px" }}>
            <Popconfirm
                title="Are you sure to delete this token?"
                onConfirm={() => deleteToken(record.ID, {
                    onSuccess: () => {
                        message.success("Token Deleted Successfully!")
                        settingsSubject.next({ action: 'tokenDeleted', token_id: record.ID })
                    },
                    onError: (error: any) => {
                        console.error("Failed to delete token:", error);
                        message.error("Error deleting token!")
                    },
                })}
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
