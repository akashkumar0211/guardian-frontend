'use client';
import React, { useEffect, useState } from 'react';
import { defaultPageInfo } from '@/constants/common-constants';
import { useDefaultVulnerabilityDetails, useAggregatedVulnerabilityDetails } from '@/queries/applications';
import { usePathname, useRouter } from 'next/navigation';
import { defaultVulnerabilityColumns } from '@/infinite-scroll-table-columns/vulnerability-default-columns';
import { aggregatedVulnerabilityColumns } from '@/infinite-scroll-table-columns/vulnerability-aggregated-columns';
import { InfiniteScrollTable } from '@/components/atomic-components/infinite-scrolling-table';
import { Switch, Tooltip } from 'antd';
import { PageInfo } from '@/interfaces/application-interface';

const ServiceDetailsWithVulnerability = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [vulnerabilityDefaultPageInfo, setDefaultPageInfo] = useState<PageInfo>(defaultPageInfo);
    const [vulnerabilityAggregatedPageInfo, setAggregatedPageInfo] = useState<PageInfo>(defaultPageInfo);
    const [serviceId, setServiceId] = useState<string | null>(null);
    const [defaultVulnerabilityData, setDefaultVulnerabilityData] = useState<any[]>([]);
    const [aggregatedVulnerabilityData, setAggregatedVulnerabilityData] = useState<any[]>([]);
    const [aggregatedView, setAggregatedView] = useState<boolean>(false);

    const { data: defaultPageData, isLoading: isDefaultDataLoading, refetch: fetchDefaultData } = useDefaultVulnerabilityDetails({
        ...vulnerabilityDefaultPageInfo,
        enabled: !aggregatedView
    });

    const { data: aggregatedPageData, isLoading: isAggregatedDataLoading, refetch: fetchAggregatedData } = useAggregatedVulnerabilityDetails({
        ...vulnerabilityAggregatedPageInfo,
        enabled: aggregatedView
    });

    useEffect(() => {
        const serviceIdFromPath = pathname.split('/').pop();

        if (serviceIdFromPath) {
            setServiceId(serviceIdFromPath);
            setDefaultPageInfo(prev => ({
                ...prev,
                service_id: serviceIdFromPath,
            }));
            setAggregatedPageInfo(prev => ({
                ...prev,
                id: serviceIdFromPath,
            }));
        } else {
            console.error('Service ID not found in the URL');
            router.push('/404');
        }
    }, [pathname]);

    const handleSwitchChange = () => {
        setDefaultVulnerabilityData([]);
        setAggregatedVulnerabilityData([]);
        setDefaultPageInfo(prev => ({ ...prev, page: 1 }));
        setAggregatedPageInfo(prev => ({ ...prev, page: 1 }));
        setAggregatedView(prev => !prev);
    };

    useEffect(() => {
        if (!aggregatedView && defaultPageData?.data) {
            setDefaultVulnerabilityData(prev => [...prev, ...defaultPageData.data]);
        }
        if (aggregatedView && aggregatedPageData?.data) {
            setAggregatedVulnerabilityData(prev => [...prev, ...aggregatedPageData.data]);
        }
    }, [defaultPageData, aggregatedPageData, aggregatedView]);

    const handlePageInfoUpdate = (newPageInfo: PageInfo) => {
        if (aggregatedView) {
            setAggregatedPageInfo({
                ...newPageInfo,
                id: serviceId || newPageInfo.service_id,
            });
        } else {
            setDefaultPageInfo({
                ...newPageInfo,
                service_id: serviceId || newPageInfo.service_id,
            });
        }
    };

    return (
        <>
            <div className="mb-4">
                <Tooltip title={'Toggle Aggregated View'}>
                    <Switch
                        checked={aggregatedView}
                        onChange={handleSwitchChange}
                    />
                </Tooltip>
            </div>

            <InfiniteScrollTable
                data={aggregatedView ? aggregatedVulnerabilityData : defaultVulnerabilityData}
                hasMore={aggregatedView 
                    ? aggregatedVulnerabilityData.length < (aggregatedPageData?.total || 0) 
                    : defaultVulnerabilityData.length < (defaultPageData?.total || 0)}
                columns={aggregatedView ? aggregatedVulnerabilityColumns : defaultVulnerabilityColumns}
                fetchData={aggregatedView ? fetchAggregatedData : fetchDefaultData}
                pageInfo={aggregatedView ? vulnerabilityAggregatedPageInfo : vulnerabilityDefaultPageInfo}
                setPageInfo={handlePageInfoUpdate}
                rowKey="_id"
                isLoading={isDefaultDataLoading || isAggregatedDataLoading}
                rowSelection={false}
            />
        </>
    );
};

export default ServiceDetailsWithVulnerability;