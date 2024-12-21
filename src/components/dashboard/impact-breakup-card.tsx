import React from "react";
import { Card, Progress } from "antd";
import { ImpactBreakupCardProps } from "@/interfaces/dashboard-interfaces";
import { labelColors, labelIcons } from "@/constants/dashboard-constants";
import { InfoCircleOutlined, } from "@ant-design/icons";


export const ImpactBreakupCard: React.FC<ImpactBreakupCardProps> = ({ cardData }) => {
  const color = labelColors[cardData.label.toLowerCase()] || "#000";
  const icon = labelIcons[cardData.label.toLowerCase()] || <InfoCircleOutlined />;

  const handleClick = () => {

  };

  return (
    <div className="p-4">
      <Card
        className="shadow-md rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
        style={{
          width: 250,
          borderRadius: "10px",
          border: "1px solid #f0f0f0",
        }}
        onClick={handleClick} // Adding onClick handler
      >
        <div className="flex items-center space-x-4">
          {/* Circular Progress */}
          <Progress
            type="circle"
            percent={Math.round(cardData.percentage)}
            width={80}
            strokeColor={color}
            trailColor="#e8e8e8"
          />
          {/* Details */}
          <div className="text-left">
            <div className="flex items-center space-x-2">
              <span className="text-2xl" style={{ color }}>
                {icon}
              </span>
              <p className="text-xl font-semibold text-gray-800">{cardData.count}</p>
            </div>
            <p className="text-sm text-gray-600">{cardData.label}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
