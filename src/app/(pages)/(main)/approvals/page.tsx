'use client'
import React, { useEffect, useState } from 'react'
import { InfiniteScrollTable } from '@/components/atomic-components/infinite-scrolling-table'
import { PageInfo } from '@/interfaces/common-interfaces';
import { useApprovals } from '@/queries/approvals'
import { approvalColumns } from '@/infinite-scroll-table-columns/approval-columns';
import { defaultPageInfo } from '@/constants/common-constants';
import { DescriptionComp } from '@/components/atomic-components/tab-description';

const ApprovalsPage = () => {
  const [pageInfo,setPageInfo]=useState<PageInfo>(defaultPageInfo)
  const [tableData, setTableData] = useState<any[]>([]);
  
  const { data: approvalsData, isLoading, refetch } = useApprovals(pageInfo);

  useEffect(() => {
    if (approvalsData?.[0]?.['data']) {
      setTableData((prev) => [...prev, ...approvalsData[0]?.data]);
    }
  }, [approvalsData]);
  return (
    <>
    <DescriptionComp activeTab={'approvals'} />
    <InfiniteScrollTable
      data={tableData}
      hasMore={tableData.length<approvalsData?.[0]?.total}
      columns={approvalColumns}
      fetchData={refetch}
      pageInfo={pageInfo}
      setPageInfo={setPageInfo} 
      rowKey="id"
      isLoading={isLoading}
      type='approvals'
    />
    </>
  );
}

export default ApprovalsPage;
