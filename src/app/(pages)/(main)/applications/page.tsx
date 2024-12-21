'use client';
import { PageInfo } from '@/interfaces/common-interfaces';
import React, { useEffect, useState } from 'react';
import { defaultPageInfo } from '@/constants/common-constants';
import { useApplications } from '@/queries/applications';
import { InfiniteScrollTable } from '@/components/atomic-components/infinite-scrolling-table';
import { applicationColumns } from '@/infinite-scroll-table-columns/application-columns';
import { useRouter } from 'next/navigation';
import { applicationSubject } from '@/event-emitters/event-emitters';

const ApplicationsPage = () => {
  const router=useRouter()
  const [pageInfo, setPageInfo] = useState<PageInfo>(defaultPageInfo);
  const [applications, setApplications] = useState<any>([]);

  const { data: applicationsData, isLoading, refetch } = useApplications(pageInfo);

  useEffect(() => {
    if (applicationsData && applicationsData['applicationList']) {
      setApplications(applicationsData['applicationList']);
    }
  }, [applicationsData]);

  useEffect(()=>{
    const subscription=applicationSubject.subscribe((res)=>{
      if(res['action']=='openServiceDetails'){
        router.push(res['pathname'])
      }
    })

    return ()=>{
      subscription.unsubscribe()
    }
  },[])

  // Always render the `InfiniteScrollTable`, but handle the loading state separately
  return (
    <>
      {isLoading ? (
        <>Loading Applications...</>
      ) : (
        <InfiniteScrollTable
          data={applications}
          hasMore={applications.length < (applicationsData?.totalCount || 0)}
          columns={applicationColumns}
          fetchData={refetch}
          pageInfo={pageInfo}
          setPageInfo={setPageInfo}
          rowKey="id"
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default ApplicationsPage;
