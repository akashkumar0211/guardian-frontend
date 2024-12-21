import React from "react";
import classNames from "classnames";
import { Tag, Typography } from "antd";
import { capitalizeFirstLetter } from "@/utils/common-utils";
export const roleTableColumns: any= [
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: any) => (
        <Typography className="text-base">{role?.display_name || '-'}</Typography>
      ),
      width: "200px",
    },
    {
      title: "Access",
      dataIndex: "scope",
      width: "200px",
      key: "scope",
      render: (scope: any) =>{
        return <Tag
        color="default"
        className={classNames(
          "border border-gray-400 rounded-md px-3 py-1 text-sm text-gray-800"
        )}
      >
        {scope}
      </Tag>
      }
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (actions: string[]) => (
        <Typography className="text-sm font-thin">{actions.map((action)=>(capitalizeFirstLetter(action))).join(", ")}</Typography>
      ),
      width: "200px",
    },
  ];