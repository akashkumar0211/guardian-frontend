'use client'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from "@ant-design/icons";

import { InfiniteScrollTable } from '@/components/atomic-components/infinite-scrolling-table'
import { FloatingButton } from '@/components/atomic-components/floating-plus-icon';
import { PolicyDialog } from '@/components/settings/create-policy-dialog';

import { PageInfo } from '@/interfaces/common-interfaces';
import { PolicyColumns } from '@/infinite-scroll-table-columns/policy-columns';
import { defaultPageInfo } from '@/constants/common-constants';
import { useGetPolicies } from '@/queries/settings';
import { settingsSubject } from '@/event-emitters/event-emitters';
import { IntegrationsDescriptionComp } from '@/components/atomic-components/integration-description';

const PolicyPage = () => {
  const [pageInfo, setPageInfo] = useState<PageInfo>(defaultPageInfo)
  const [tableData, setTableData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editPolicyData, setEditPolicyData] = useState(null)

  const { data: policiesData, isLoading, refetch } = useGetPolicies(pageInfo);
  useEffect(() => {
    if (policiesData) {
      //checking if the new data is not same as previous data then only we will make update table data
      // const newData = policiesData['list'].filter(
      //   (item:any) => !tableData.some((existing) => existing.id === item.id)
      // );

      // if (newData.length > 0) {
      //   setTableData((prev) => [...prev, ...newData]);
      // }
      setTableData((prev) => policiesData?.list);
    }
  }, [policiesData]);

  useEffect(() => {
    const subscription = settingsSubject.subscribe((res: any) => {
      if (res['action'] == 'policyAdded' || res['action'] == 'policyUpdated' || res['action'] == 'policyDeleted') {
        // setTableData((prevTableData)=>[...prevTableData,res['policy']])
        refetch()
      }
      else if (res['action'] == 'policyDeleted') {
        // setTableData((prevTableData)=>prevTableData.filter((policy:any)=>policy.id!==res['policy_id']))
      }
      else if (res['action'] == 'policyUpdated') {
        // setTableData((prevTableData)=>prevTableData.map((policy:any)=>policy.id===res['policy']['id']?res['']:policy))
      }
      else if (res['action'] == 'editPolicy') {
        setIsModalOpen(true)
        setEditPolicyData(res['policy'])
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  return (
    <>
      <IntegrationsDescriptionComp scan={"policies"} />

      <InfiniteScrollTable
        data={tableData}
        hasMore={tableData.length < (policiesData?.['toalcount'] || 0)}
        columns={PolicyColumns}
        fetchData={refetch}
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
        rowKey="id"
        isLoading={isLoading}
      />
      <PolicyDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} policyData={editPolicyData} setEditPolicyData={setEditPolicyData} />
      <FloatingButton onClick={() => { setIsModalOpen(true) }} icon={<PlusOutlined />} tooltipTitle='Create Policy' key={'policy'} />
    </>
  );
}

export default PolicyPage;
