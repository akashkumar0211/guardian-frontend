'use client'
import { useAverageResolutionTime } from "@/queries/dashboard";
import { useDashboardFilterStore } from "@/store/dashboard-filter-store";
import { Typography } from "antd";

import dynamic from "next/dynamic";
const ResolutionCircle = dynamic(() => import("@/components/dashboard/resolution-circle").then((res) => {
  return res.ResolutionCircle;
}), {
  ssr: false
});

export const AverageDaysToResolution: React.FC = () => {
  const { filters } = useDashboardFilterStore()

  const { data: resolutionData, isLoading } = useAverageResolutionTime(filters)
  if (isLoading) {
    return <p>Loading Average Days...</p>;
  }

  return (
    <div className="border rounded py-4 px-12 flex flex-col items-center">
      <Typography.Title level={5} className="text-start">
        Average Days to Resolution
      </Typography.Title>
      <div className="grid grid-cols-2 gap-1 gap-x-5">
        <ResolutionCircle days={Math.ceil(resolutionData?.critical.days || 0)} label="Critical" />
        <ResolutionCircle days={Math.ceil(resolutionData?.high.days || 0)} label="High" />
        <ResolutionCircle days={Math.ceil(resolutionData?.medium.days || 0)} label="Medium" />
        <ResolutionCircle days={Math.ceil(resolutionData?.low.days || 0)} label="Low" />
      </div>
    </div>
  );
};
