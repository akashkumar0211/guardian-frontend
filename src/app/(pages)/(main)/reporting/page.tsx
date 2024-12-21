'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { PlusOutlined } from "@ant-design/icons";

import { PageInfo } from '@/interfaces/common-interfaces';
import { useReports, useSchedules, useTemplates } from '@/queries/reporting';
import { reportingSubject } from '@/event-emitters/event-emitters';
import { defaultPageInfo } from '@/constants/common-constants';
import { getDeletedItems, saveDeletedItems } from '@/utils/common-utils';
import { reportsTabs } from '@/utils/tabs-data';
import { reportsColumns } from '@/infinite-scroll-table-columns/reporting-columns';
import { templateColumns } from '@/infinite-scroll-table-columns/template-columns';
import { scheduleColumns } from '@/infinite-scroll-table-columns/schedules-columns';

import dynamic from "next/dynamic";
import { FloatingButton } from '@/components/atomic-components/floating-plus-icon';
import { DescriptionComp } from '@/components/atomic-components/tab-description';
const InfiniteScrollTable = dynamic(() => import("@/components/atomic-components/infinite-scrolling-table").then((res) => {
  return res.InfiniteScrollTable;
}), {
  ssr: false
});
const NavigationTabs = dynamic(() => import("@/components/atomic-components/navigation-tabs").then((res) => {
  return res.NavigationTabs;
}), {
  ssr: false
});
const ReportDialog = dynamic(() => import("@/components/reporting/create-report-dialog").then((res) => {
  return res.ReportDialog;
}), {
  ssr: false
});
const TemplateDialog = dynamic(() => import("@/components/reporting/create-template-dialog").then((res) => {
  return res.TemplateDialog;
}), {
  ssr: false
});

const ScheduleDialog = dynamic(() => import("@/components/reporting/create-schedule-dialog").then((res) => {
  return res.ScheduleDialog;
}), {
  ssr: false
}); const ReportingPage = () => {
  const [modalInfo, setModalInfo] = useState({
    open: false,
    type: 'templates',
  });

  const pathname = usePathname()

  const [templatesPageInfo, setTemplatesPageInfo] = useState<PageInfo>(defaultPageInfo);
  const [templatesData, setTemplatesData] = useState<any[]>([]);
  const [deletedTemplates, setDeletedTemplates] = useState<Set<string>>(getDeletedItems('deletedTemplates')); // Read from localStorage

  const [reportsPageInfo, setReportsPageInfo] = useState<PageInfo>(defaultPageInfo);
  const [reportsData, setReportsData] = useState<any[]>([]);
  const [deletedReports, setDeletedReports] = useState<Set<string>>(getDeletedItems('deletedReports')); // Read from localStorage

  const [schedulesPageInfo, setSchedulesPageInfo] = useState<PageInfo>(defaultPageInfo);
  const [schedulesData, setSchedulesData] = useState<any[]>([]);
  const [deletedSchedules, setDeletedSchedules] = useState<Set<string>>(getDeletedItems('deletedSchedules')); // Read from localStorage

  const [activeTab, setActiveTab] = useState<string>('templates');
  const [editTemplateData, setEditTemplateData] = useState<any>(null);

  let { data: templatesResponse, isLoading: templatesLoading, refetch: refetchTemplates } = useTemplates(templatesPageInfo);
  let { data: reportsResponse, isLoading: reportsLoading, refetch: refetchReports } = useReports(reportsPageInfo);
  let { data: schedulesResponse, isLoading: schedulesLoading, refetch: refetchSchedules } = useSchedules(schedulesPageInfo);

  const handleTabChange = (activeKey: string) => {
    setActiveTab(activeKey);
  };

  const handleButtonClick = () => {
    setModalInfo({ open: true, type: activeTab });
  };

  // Effect to handle Templates data
  useEffect(() => {
    if (templatesResponse?.templates && activeTab === 'templates') {
      const newTemplates = templatesResponse.templates.filter(
        (item: any) => !templatesData.some((existing) => existing.id === item.id) && !deletedTemplates.has(item.id)
      );
      if (newTemplates.length > 0) {
        setTemplatesData((prev) => [...prev, ...newTemplates]);
      }
    }
  }, [templatesResponse, activeTab, deletedTemplates]);

  // Effect to handle Reports data
  useEffect(() => {
    if (reportsResponse?.reports && activeTab === 'reports') {
      const newReports = reportsResponse.reports.filter(
        (item: any) => !reportsData.some((existing) => existing.id === item.id) && !deletedReports.has(item.id)
      );
      if (newReports.length > 0) {
        setReportsData((prev) => [...prev, ...newReports]);
      }
    }
  }, [reportsResponse, activeTab, deletedReports]);

  // Effect to handle Schedules data
  useEffect(() => {
    if (schedulesResponse?.schedules && activeTab === 'schedules') {
      const newSchedules = schedulesResponse.schedules.filter(
        (item: any) => !schedulesData.some((existing) => existing.id === item.id) && !deletedSchedules.has(item.id)
      );
      if (newSchedules.length > 0) {
        setSchedulesData((prev) => [...prev, ...newSchedules]);
      }
    }
  }, [schedulesResponse, activeTab, deletedSchedules]);

  //effect for handling events
  useEffect(() => {
    const subscription = reportingSubject.subscribe((res: any) => {
      if (res['action'] === 'reportDeleted') {
        setReportsData((prevReportsData) =>
          prevReportsData.filter((report) => report['id'] !== res['report_id'])
        );
        setDeletedReports((prev) => {
          const newDeleted = new Set(prev);
          newDeleted.add(res['report_id']);
          saveDeletedItems('deletedReports', newDeleted); // Save to localStorage
          return newDeleted;
        });
      } else if (res['action'] === 'templateDeleted') {
        setTemplatesData((prevTemplatesData) =>
          prevTemplatesData.filter((template) => template['id'] !== res['template_id'])
        );
        setDeletedTemplates((prev) => {
          const newDeleted = new Set(prev);
          newDeleted.add(res['template_id']);
          saveDeletedItems('deletedTemplates', newDeleted); // Save to localStorage
          return newDeleted;
        });
      } else if (res['action'] === 'scheduleDeleted') {
        setSchedulesData((prevSchedulesData) =>
          prevSchedulesData.filter((schedule) => schedule['id'] !== res['schedule_id'])
        );
        setDeletedSchedules((prev) => {
          const newDeleted = new Set(prev);
          newDeleted.add(res['schedule_id']);
          saveDeletedItems('deletedSchedules', newDeleted); // Save to localStorage
          return newDeleted;
        });
      } else if (res['action'] === 'reportAdded') {
        setReportsData((prevReportsData) => [res['report'], ...prevReportsData]);
      } else if (res['action'] === 'templateAdded') {
        setTemplatesData((prevTemplatesData) => [res['template'], ...prevTemplatesData]);
      } else if (res['action'] === 'scheduleAdded') {
        setSchedulesData((prevSchedulesData) => [res['schedule'], ...prevSchedulesData]);
      } else if (res['action'] === 'templateUpdated') {
        setTemplatesData((prevTemplatesData) =>
          prevTemplatesData.map((template) =>
            template['id'] === res['template']['id'] ? res['template'] : template
          )
        );
      } else if (res['action'] === 'editTemplate') {
        setModalInfo({ open: true, type: activeTab });
        setEditTemplateData(res['template']);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);


  useEffect(() => {
    refetchReports()
    refetchSchedules()
    refetchTemplates
  }, [pathname])

  return (
    <>
      <NavigationTabs items={reportsTabs} onTabChange={handleTabChange} />
      <DescriptionComp activeTab={activeTab} />
      {activeTab === 'templates' && (
        <>
          <InfiniteScrollTable
            data={templatesData}
            hasMore={templatesData.length < (templatesResponse?.meta?.total || 0)}
            columns={templateColumns}
            fetchData={refetchTemplates}
            pageInfo={templatesPageInfo}
            setPageInfo={setTemplatesPageInfo}
            rowKey="id"
            isLoading={templatesLoading}
          />
        </>
      )}
      {activeTab === 'reports' && (
        <>
          <InfiniteScrollTable
            data={reportsData}
            hasMore={reportsData.length < (reportsResponse?.meta?.total || 0)}
            columns={reportsColumns}
            fetchData={refetchReports}
            pageInfo={reportsPageInfo}
            setPageInfo={setReportsPageInfo}
            rowKey="id"
            isLoading={reportsLoading}
          />
        </>
      )}
      {activeTab === 'schedules' && (
        <>
          <InfiniteScrollTable
            data={schedulesData}
            hasMore={schedulesData.length < (schedulesResponse?.meta?.total || 0)}
            columns={scheduleColumns}
            fetchData={refetchSchedules}
            pageInfo={schedulesPageInfo}
            setPageInfo={setSchedulesPageInfo}
            rowKey="id"
            isLoading={schedulesLoading}
          />
        </>
      )}
      {activeTab === 'reports' && <ReportDialog isModalOpen={modalInfo.open} setIsModalOpen={setModalInfo} />}
      {activeTab === 'templates' && <TemplateDialog isModalOpen={modalInfo.open} setIsModalOpen={setModalInfo} editTemplate={editTemplateData} />}
      {activeTab === 'schedules' && <ScheduleDialog isModalOpen={modalInfo.open} setIsModalOpen={setModalInfo} />}
      <FloatingButton onClick={handleButtonClick} icon={<PlusOutlined />} tooltipTitle={`Create ${activeTab.slice(0, 1).toUpperCase() + activeTab.slice(1)}`} />
    </>
  );
};

export default ReportingPage;
