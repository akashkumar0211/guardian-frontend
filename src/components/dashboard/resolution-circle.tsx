import React, { FC } from "react";
import { Typography } from "antd";
import { ResolutionCircleProps } from "@/interfaces/dashboard-interfaces";
import { labelColors } from "@/constants/dashboard-constants";
export const ResolutionCircle: FC<ResolutionCircleProps> = ({ label, days }) => {



  return (
    <div className="flex flex-col items-center">
      {/* Circle Container */}
      <div
        style={{ backgroundColor: labelColors[label.toLowerCase()] }}
        className={`relative w-32 h-32 rounded-full shadow-md border-4 flex justify-center items-center`}
      >
        {/* Inner Content */}
        <div className="flex flex-col items-center">
          <Typography.Text
            className={`font-semibold text-lg uppercase text-black`}
          >
            {label}
          </Typography.Text>
          <Typography.Text className={`text-sm text-white`}>
            {days} Days
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default ResolutionCircle;
