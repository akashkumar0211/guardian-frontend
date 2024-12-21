import React from "react";
import { FloatButton, Tooltip } from "antd";

export const FloatingButton: React.FC<{ onClick: () => void,icon:React.ReactNode,tooltipTitle:string }> = ({ onClick,icon,tooltipTitle }) => {
    return (
      <Tooltip title={tooltipTitle} placement="left">
        <FloatButton
          icon={icon}
          type="primary"
          shape="circle"
          onClick={onClick}
          className="shadow-lg hover:scale-110 transition-transform mr-10 mb-10"
        />
      </Tooltip>
    );
  };