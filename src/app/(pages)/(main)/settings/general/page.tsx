'use client'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from "@ant-design/icons";

import { InfiniteScrollTable } from '@/components/atomic-components/infinite-scrolling-table'
import { FloatingButton } from '@/components/atomic-components/floating-plus-icon';
import { TokenDialog } from '@/components/settings/create-token-dialog';

import { PageInfo } from '@/interfaces/common-interfaces';
import { tokenColumns } from '@/infinite-scroll-table-columns/general-token-columns';
import { defaultPageInfo } from '@/constants/common-constants';
import { useGetTokenInfo } from '@/queries/settings';
import { settingsSubject } from '@/event-emitters/event-emitters';
import { IntegrationsDescriptionComp } from '@/components/atomic-components/integration-description';

const GeneralPage = () => {
  const [pageInfo, setPageInfo] = useState<PageInfo>(defaultPageInfo)
  const [tableData, setTableData] = useState<any[]>([]);
  const [isModalOpen,setIsModalOpen]=useState(false)

  const { data: tokenData, isLoading, refetch } = useGetTokenInfo(pageInfo);
  useEffect(() => {
    if (tokenData) {
      //checking if the new data is not same as previous data then only we will make update table data
      // const newData = tokenData['list'].filter(
      //   (item:any) => !tableData.some((existing) => existing.id === item.id)
      // );

      // if (newData.length > 0) {
      //   setTableData((prev) => [...prev, ...newData]);
      // }
      setTableData(tokenData?.list);
    }
  }, [tokenData]);

  useEffect(()=>{
    const subscription=settingsSubject.subscribe((res:any)=>{
      if(res['action']=='tokenAdded' || res['action']=='tokenDeleted'){
        refetch()
      }
    })
    return ()=>{
      subscription.unsubscribe()
    }
  },[])
  return (
    <>
      <IntegrationsDescriptionComp scan={"tokens"}/>
      <InfiniteScrollTable
        data={tableData}
        hasMore={tableData.length < (tokenData?.['totalCount'] || 0)}
        columns={tokenColumns}
        fetchData={refetch}
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
        rowKey="id"
        isLoading={isLoading}
      />
      <TokenDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      <FloatingButton onClick={()=>{setIsModalOpen(true)}} icon={<PlusOutlined/>} tooltipTitle='Add Token' key={'token'} />
    </>
  );
}

export default GeneralPage;
