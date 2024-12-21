import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { addAiToken, addGitCredentials, deleteAiToken, deleteGitCredential, fetchAITokens, fetchAITools, fetchGitCredentials, fetchSecurityTools, updateAiToken, updateGitCredentials } from '@/services/integrations';

export const useGetSecurityTools = (filters: Record<any, any>, enabled?: boolean): UseQueryResult<any> =>
    useQuery({
        queryKey: ['integration', filters],
        queryFn: () => fetchSecurityTools(filters),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled
    });

export const useGetAITools = (filters: Record<any, any>, enabled?: boolean): UseQueryResult<any> =>
    useQuery({
        queryKey: ['ai', filters],
        queryFn: () => fetchAITools(filters),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled
    });
    
export const useGetAITokens = (filters: Record<any, any>, enabled?: boolean): UseQueryResult<any> =>
    useQuery({
        queryKey: ['ai_tokens', filters],
        queryFn: () => fetchAITokens(filters),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled
    });

export const useGetGitCredentials = (filters: Record<any, any>, enabled?: boolean): UseQueryResult<any> =>
    useQuery({
        queryKey: ['git', filters],
        queryFn: () => fetchGitCredentials(filters),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled
    });


export const useAddGitCredentials = () => {
    return useMutation({
        mutationFn: (payload: any) => addGitCredentials(payload),
    });
};

export const useAddAIToken = () => {
    return useMutation({
        mutationFn: (payload: any) => addAiToken(payload),
    });
};

export const useUpdateAIToken = () => {
    return useMutation({
        mutationFn: (payload: any) => updateAiToken(payload),
    });
};

export const useUpdateGitCredentials = () => {
    return useMutation({
        mutationFn: (payload: any) => updateGitCredentials(payload),
    });
};

export const useDeleteAIToken = () => {
    return useMutation({
        mutationFn: (payload: any) => deleteAiToken(payload),
    });
};

export const useDeleteGitCredential = () => {
    return useMutation({
        mutationFn: (git_id: string) => deleteGitCredential(git_id),
    });
};


