import { Progress, Typography, Card } from "antd";
import { topFindingColors } from "@/constants/dashboard-constants";
import { TopFindingItem } from "@/interfaces/dashboard-interfaces";
import { useTopFindings } from "@/queries/dashboard";
import { useDashboardFilterStore } from "@/store/dashboard-filter-store";

export const TopFindingsComponent: React.FC = () => {
  const { filters } = useDashboardFilterStore();
  const { data: topFindingData, isLoading } = useTopFindings(filters);

  if (isLoading) {
    return <p>Loading top findings...</p>;
  }

  return (
    <div className="p-4 bg-white border shadow rounded max-h-[400px] overflow-y-auto">
      {/* Sticky Title */}
      <div className="sticky top-0 bg-white z-10 pb-2">
        <Typography.Title level={4} className="text-lg border-b pb-2">
          Top Finding Types
        </Typography.Title>
      </div>

      {/* Scrollable Content */}
      <div className="flex flex-col gap-4 mt-4">
        {topFindingData &&
          topFindingData.map((item: TopFindingItem, index: number) => (
            <Card key={index} bordered={false} className="shadow-md rounded-lg">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex-1">
                  <Typography.Text className="block text-lg font-semibold text-gray-800">
                    {item.cwe_title}
                  </Typography.Text>
                </div>
                <div className="w-24 text-right">
                  <Typography.Text className="font-medium text-gray-600">
                    {Math.ceil(item.percentage)}%
                  </Typography.Text>
                </div>
              </div>
              <Progress
                percent={Math.ceil(item.percentage)}
                showInfo={false}
                strokeColor={topFindingColors[index % topFindingColors.length]}
                trailColor="#F0F0F0"
                strokeWidth={8}
                size="small"
                className="mt-2"
              />
            </Card>
          ))}
      </div>
    </div>
  );
};
