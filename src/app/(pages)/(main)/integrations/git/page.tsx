'use client'
import { useEffect, useState } from 'react'
import { PlusOutlined } from "@ant-design/icons";

import { InfiniteScrollTable } from '@/components/atomic-components/infinite-scrolling-table'
import { FloatingButton } from '@/components/atomic-components/floating-plus-icon';
import { GitDialog } from '@/components/integrations/create-git-add-dialog';

import { PageInfo } from '@/interfaces/common-interfaces';
import { gitColumns } from '@/infinite-scroll-table-columns/git-credentials-columns';
import { defaultPageInfo } from '@/constants/common-constants';
import { integrationsSubject } from '@/event-emitters/event-emitters';
import { useGetGitCredentials } from '@/queries/integrations';
import { IntegrationsDescriptionComp } from '@/components/atomic-components/integration-description';

const GitPage = () => {
  const [pageInfo, setPageInfo] = useState<PageInfo>(defaultPageInfo)
  const [tableData, setTableData] = useState<any[]>([]);
  const [isModalOpen,setIsModalOpen]=useState(false)
  const [gitData,setGitData]=useState(null)


  const { data: gitCredentials, isLoading, refetch } = useGetGitCredentials(pageInfo);
  useEffect(() => {
    if (gitCredentials) {
      // const newData = gitCredentials['list'].filter(
      //   (item:any) => !tableData.some((existing) => existing.id === item.id)
      // );

      // if (newData.length > 0) {
      //   setTableData((prev) => [...prev, ...newData]);
      // }
      setTableData(gitCredentials?.list);
    }
  }, [gitCredentials]);

  useEffect(()=>{
    const subscription=integrationsSubject.subscribe((res:any)=>{
      if(res['action']=='gitAdded' || res['action']=='gitUpdated' || res['action']=='gitDeleted'){
        setGitData(null)
        refetch()
      }
      else if(res['action']=='editGit'){
        setGitData(res['git'])
        setIsModalOpen(true)
      }
    })
    return ()=>{
      subscription.unsubscribe()
    }
  },[])
  return (
    <>
      <IntegrationsDescriptionComp scan={"git"}/>
      <InfiniteScrollTable
        data={tableData}
        hasMore={tableData.length < (gitCredentials?.['totalCount'] || 0)}
        columns={gitColumns}
        fetchData={refetch}
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
        rowKey="id"
        isLoading={isLoading}
      />
      <GitDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} gitData={gitData} setGitData={setGitData}/>
      <FloatingButton onClick={()=>{setIsModalOpen(true)}} icon={<PlusOutlined/>} tooltipTitle='Add Git Credentials' key={'git'} />
    </>
  );
}

export default GitPage;
