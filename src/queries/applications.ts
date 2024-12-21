import {  useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchAggregatedVulnerabilityDetails, fetchApplications, fetchDefaultVulnerabilityDetails } from '@/services/applications';

export const useApplications = (filters: Record<any, any>): UseQueryResult<any> =>
    useQuery({
      queryKey: ['applications', filters],
      queryFn: () => fetchApplications(filters),
      refetchOnWindowFocus: false,
      retry:false
    });
  
export const useDefaultVulnerabilityDetails = (filters: Record<any, any>): UseQueryResult<any> =>
    useQuery({
      queryKey: ['service_detail', filters],
      queryFn: () => fetchDefaultVulnerabilityDetails(filters),
      refetchOnWindowFocus: false,
      enabled:filters?.service_id?.length>0,
      retry:false
    });
  
export const useAggregatedVulnerabilityDetails = (filters: Record<any, any>): UseQueryResult<any> =>
    useQuery({
      queryKey: ['aggregated_service_detail', filters],
      queryFn: () => fetchAggregatedVulnerabilityDetails(filters),
      refetchOnWindowFocus: false,
      enabled:filters.enabled,
      retry:false
    });
  
