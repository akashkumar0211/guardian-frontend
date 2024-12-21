'use client'
import { useServices, useTags } from "@/queries/dashboard";
import { useDashboardFilterStore } from "@/store/dashboard-filter-store";
import { useEffect } from "react";

import dynamic from "next/dynamic";
import { OwaspTopTen } from "@/components/dashboard/owasp-top-ten";
import { TopFindingsComponent } from "@/components/dashboard/top-findings";
const ImpactBreakup = dynamic(() => import("@/components/dashboard/impact-breakup").then((res) => { return res.ImpactBreakupSection; }), { ssr: false, });
const CountTrendChart = dynamic(() => import("@/components/dashboard/count-trend-line-chart").then((res) => { return res.CountTrendChart; }), { ssr: false, });
const AverageDaysToResolution = dynamic(() => import("@/components/dashboard/average-days-resolution").then((res) => { return res.AverageDaysToResolution; }), { ssr: false, });
const TopFindings = dynamic(() => import("@/components/dashboard/top-findings").then((res) => { return res.TopFindingsComponent; }), { ssr: false, });
const CreatedResolvedChart = dynamic(() => import("@/components/dashboard/created-resolved").then((res) => { return res.CreatedResolvedChart; }), { ssr: false, });
const MultiSelect = dynamic(() => import("@/components/atomic-components/multi-select").then((res) => { return res.MultiSelect; }), { ssr: false, });

const DashboardPage = () => {

  //filters
  const { setTags, setServices, filters } = useDashboardFilterStore()

  //services for fetching data
  const { data: tags } = useTags()
  const { data: services, isLoading: serviceLoading } = useServices(filters)

  //helper functions
  const handleTagsChange = (fields: any) => {
    setTags(fields)
  }

  const handleServicesChange = (fields: any) => {
    setServices(fields)
  }

  //side effects
  useEffect(() => {
    if (!serviceLoading) {
      let filteredServices = filters.service_ids.filter((item: any) => services?.some((service) => service.id === item))
      setServices(filteredServices)
    }
  }, [services])

  //JSX
  return (
    <div className="h-screen overflow-scroll flex flex-col">
      <div className="flex justify-end gap-2 mr-5 mt-2">
        <div className="w-full max-w-sm">
          <MultiSelect
            onChange={handleTagsChange}
            options={tags?.map((tag) => ({ label: tag, value: tag })) || []}
            placeholder="Select Tags"
            defaultValue={filters.tags}
          />
        </div>
        <div className="w-60">
          <MultiSelect
            onChange={handleServicesChange}
            options={services?.map((service) => ({ label: service.serviceName, value: service.id })) || []}
            placeholder="Select Applications"
            defaultValue={filters.service_ids}
          />
        </div>
      </div>

      <div className="mt-2 flex-1 overflow-auto">
        <div className="flex gap-2 items-center">
          <ImpactBreakup />
          <AverageDaysToResolution />
        </div>
        <div className="grid grid-cols-2 gap-2 mr-5">
          <CountTrendChart />
          <CreatedResolvedChart />
        </div>
        <div className="grid grid-cols-2 mt-2 gap-2 mr-5 mb-3">
          <TopFindingsComponent />
          <OwaspTopTen />
        </div>
      </div>
    </div>


  );
};

export default DashboardPage;
