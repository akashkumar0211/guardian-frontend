'use client'
import { useQuery } from '@tanstack/react-query';
import { PageInfo } from '@/interfaces/common-interfaces';
import axios from 'axios';
import React, { useState } from 'react'
import { getDetails } from '@/services/api-services';
const transport = axios.create({ withCredentials: true });


const ApplicationsPage = () => {
  const [applicationsPage,setApplicationsPage]=useState<PageInfo>({page:0,pageSize:10})
  const { refetch: applicationsDataFunc, data: applicationsData = {
    data: [],
    totalCount: 0,
}, isLoading: applicationDataLoading } = useQuery({
    queryKey: ['applicationsData', applicationsPage],
    queryFn: async () => {
        let url = `http://localhost:8087/api/v1/service/all?page=${applicationsPage.page + 1}&size=${applicationsPage.pageSize}`;
        // if (search.length) {
        //     url += `&filter=servicename%7Cregex%7C.*${search}.*%7Cstring`
        // }
        // if (filters?.tags?.length) {
        //     url += `&filter=tags|in|${ filters.tags.join("%3B")}|string`
        // }
        // if (sortFilters.lastscan) {
        //     url += `&sort=lastscan|${sortFilters.order}`
        // }
        // if (sortFilters.servicename) {
        //     url += `&sort=servicename|${sortFilters.order}`
        // }
        // return await getDetails(url,
        //     {
        //         headers: ''
        //     })
    },
    // throwOnError: (error) => (console.error(error)),
    enabled: true,
    select: (data) => {      
    }
})
  return (
    <div>ApplicationsPage</div>
  )
}

export default ApplicationsPage