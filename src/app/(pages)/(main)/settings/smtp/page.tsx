'use client'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from "@ant-design/icons";
import { InfiniteScrollTable } from '@/components/atomic-components/infinite-scrolling-table'
import { FloatingButton } from '@/components/atomic-components/floating-plus-icon';
import { SMTPDialog } from '@/components/settings/create-smtp-dialog';

import { PageInfo } from '@/interfaces/common-interfaces';
import { smtpColumns } from '@/infinite-scroll-table-columns/smtp-columns';
import { defaultPageInfo } from '@/constants/common-constants';
import { useGetSmtp } from '@/queries/settings';
import { settingsSubject } from '@/event-emitters/event-emitters';
import { IntegrationsDescriptionComp } from '@/components/atomic-components/integration-description';

const SmtpPage = () => {
  const [pageInfo, setPageInfo] = useState<PageInfo>(defaultPageInfo)
  const [tableData, setTableData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editSmtpData, setEditSmtpData] = useState(null)

  const { data: smtpData, isLoading, refetch } = useGetSmtp(pageInfo);
  useEffect(() => {
    if (smtpData) {
      //checking if the new data is not same as previous data then only we will make update table data
      const newData = smtpData['users'].filter(
        (item: any) => !tableData.some((existing) => existing.id === item.id)
      );

      if (newData.length > 0) {
        setTableData((prev) => [...prev, ...newData]);
      }
      // setTableData((prev) => [...prev, ...smtpData?.users]);
    }
  }, [smtpData]);

  useEffect(() => {
    const subscription = settingsSubject.subscribe((res: any) => {
      if (res['action'] == 'smtpAdded') {
        setTableData((prevTableData) => [...prevTableData, ...res['smtp']])
      }
      else if (res['action'] == 'smtpDeleted') {
        setTableData((prevTableData) => prevTableData.filter((smtp: any) => smtp.id !== res['smtp']['id']))
      }
      else if (res['action'] == 'editSmtp') {
        setIsModalOpen(true)
        setEditSmtpData(res['smtp'])
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])
  return (
    <>
      <IntegrationsDescriptionComp scan={"smtp"} />

      <InfiniteScrollTable
        data={tableData}
        hasMore={tableData.length < (smtpData?.['total'] || 0)}
        columns={smtpColumns}
        fetchData={refetch}
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
        rowKey="id"
        isLoading={isLoading}
      />
      <SMTPDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} smtpData={editSmtpData} />
      <FloatingButton onClick={() => { setIsModalOpen(true) }} icon={<PlusOutlined />} tooltipTitle='Create SMTP' key={'smtp'} />
    </>
  );
}

export default SmtpPage;
