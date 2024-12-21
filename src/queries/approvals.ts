import { useInfiniteQuery, UseInfiniteQueryResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchApprovalDetails } from '@/services/approvals';
import { defaultPageInfo } from '@/constants/common-constants';

export const useApprovals = (filters: Record<any, any>): UseQueryResult<any> =>
    useQuery({
      queryKey: ['approvals', filters],
      queryFn: () => fetchApprovalDetails(filters),
      refetchOnWindowFocus: false,
      retry:false
    });
  

// export const useApprovals = (): UseInfiniteQueryResult<any> =>
//   useInfiniteQuery({
//     queryKey: ['approvals'],
//     queryFn: ({ pageParam }:{pageParam:number}) => fetchApprovalDetails({page: pageParam,size:defaultPageInfo.size }),
//     initialPageParam: 1,
//     getNextPageParam: (lastPage: any) =>lastPage,
//     getPreviousPageParam: (firstPage: any) =>firstPage.prevCursor,
//   })

