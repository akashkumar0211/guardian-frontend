import { useQuery } from '@tanstack/react-query';
import { fetchImpactBreakup, fetchTopFindings, fetchTags, fetchServices, fetchTrendGraphData, fetchCreatedVsResolvedTrend, fetchCreatedVsResolvedTable, fetchAverageResolutionTime, fetchOwaspTopTen, } from '@/services/dashboard';
import { colors } from '@/constants/dashboard-constants';

export const useImpactBreakup = (filters: Record<string, any>) =>
  useQuery({
    queryKey: ['impactBreakup', filters.tags, filters.service_ids],
    queryFn: () => fetchImpactBreakup(filters),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5
  });

export const useAverageResolutionTime = (filters: Record<string, any>) =>
  useQuery({
    queryKey: ['averageResolutionTime', filters.tags, filters.service_ids],
    queryFn: () => fetchAverageResolutionTime(filters),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5
  });

export const useTopFindings = (filters: Record<string, any>) =>
  useQuery({
    queryKey: ['topFindings', filters.tags, filters.service_ids],
    queryFn: () => fetchTopFindings(filters),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5
  });

export const useTags = (enabled?: boolean) => useQuery({
  queryKey: ['tags'],
  queryFn: () => fetchTags(),
  retry: false,
  enabled: enabled,
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60 * 5
});

export const useServices = (filters: Record<string, any>, enabled?: boolean) =>
  useQuery({
    queryKey: ['services', filters.tags],
    queryFn: () => fetchServices(filters),
    enabled: enabled,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5
  });

export const useOwaspTopTen = (filters: Record<string, string>) =>
  useQuery({
    queryKey: ['owaspTopTen'],
    queryFn: () => fetchOwaspTopTen(filters),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5
  });

export const useTrendGraphData = (filters: Record<any, any>) =>
  useQuery({
    queryKey: ['trendGraphData', filters.dates, filters.tags, filters.service_ids],
    queryFn: () => fetchTrendGraphData(filters),
    select: (data) => (
      {
        data: data?.data?.map((item, index) => (
          {
            label: item.labels.toUpperCase(),
            data: item.data,
            backgroundColor: colors[index]["backgroundColor"],
            borderColor: colors[index]["borderColor"],
            tension: 0.3
          }
        )),
        labels: data.labels
      }
    ),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5
  });

export const useCreatedVsResolvedTrend = (filters: Record<string, any>) =>
  useQuery({
    queryKey: ['createdVsResolvedTrend', filters.dates, filters.tags, filters.service_ids],
    queryFn: () => fetchCreatedVsResolvedTrend(filters),
    select: (data: any) => (
      {
        data: data?.data?.map((item: any, index: number) => (
          {
            label: item.label,
            data: item.data,
            backgroundColor: colors[index]["backgroundColor"],
            borderColor: colors[index]["borderColor"],
            tension: 0.3
          }
        )),
        labels: data.labels
      }
    ),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5
  });
