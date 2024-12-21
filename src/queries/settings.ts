import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { addPolicy, addSmtpDetails, addToken, deletePolicy, deleteSmtpDetails, deleteToken, fetchPolicyDetails, fetchSmtpDetails, fetchTokenDetails, updatePolicy, updateSmtpDetails } from '@/services/settings';

export const useGetSmtp = (filters: Record<any, any>, enabled?: boolean): UseQueryResult<any> =>
    useQuery({
        queryKey: ['smtp', filters],
        queryFn: () => fetchSmtpDetails(filters),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled
    });


export const useGetPolicies = (filters: Record<any, any>, enabled?: boolean): UseQueryResult<any> =>
    useQuery({
        queryKey: ['policy', filters],
        queryFn: () => fetchPolicyDetails(filters),
        refetchOnWindowFocus: false,
        retry: false,
        enabled,
        staleTime: 1000 * 60 * 5
    });



export const useGetTokenInfo = (filters: Record<any, any>, enabled?: boolean): UseQueryResult<any> =>
    useQuery({
        queryKey: ['tokens', filters],
        queryFn: () => fetchTokenDetails(filters),
        refetchOnWindowFocus: false,
        retry: false,
        enabled,
        staleTime: 1000 * 60 * 5
    });


export const useAddSmtp = () => {
    return useMutation({
        mutationFn: (payload: any) => addSmtpDetails(payload),
    })
}

export const useAddPolicy = () => {
    return useMutation({
        mutationFn: (payload: any) => addPolicy(payload),
    })
}


export const useAddToken = () => {
    return useMutation({
        mutationFn: (payload: any) => addToken(payload),
    })
}

export const useUpdateSmtp = () => {
    return useMutation({
        mutationFn: (payload: any) => updateSmtpDetails(payload),
    })
}


export const useUpdatePolicy = () => {
    return useMutation({
        mutationFn: (payload: any) => updatePolicy(payload),
    })
}

export const useDeleteSmtp = () => {
    return useMutation({
        mutationFn: (smtp_id: string) => deleteSmtpDetails(smtp_id)
    })
}


export const useDeletePolicy = () => {
    return useMutation({
        mutationFn: (policy_id: string) => deletePolicy(policy_id)
    })
}


export const useDeleteToken = () => {
    return useMutation({
        mutationFn: (token_id: string) => deleteToken(token_id)
    })
}