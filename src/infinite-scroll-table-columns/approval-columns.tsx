import { ColumnsType } from "antd/es/table";

export const approvalColumns: ColumnsType<any> = [
  {
    title: "Vulnerability Name",
    dataIndex: "vul_name",
    key: "vul_name",
    ellipsis: true, // Truncates long names
  },

  {
    title: "Created By",
    dataIndex: "created_by",
    key: "created_by",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const statusColors: Record<string, string> = {
        approved: "green",
        pending: "orange",
        rejected: "red",
      };
      return <span style={{ color: statusColors[status] || "blue" }}>{status.toUpperCase()}</span>;
    },
  },
  {
    title: "Created Date",
    dataIndex: "created_date",
    key: "created_date",
    render: (date: string) => date.split("T")[0],
  },

];
