import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { addTeam, addUser, deleteTeam, deleteUser, fetchIamRoles, fetchIamTeams, fetchIamUsers, updateTeam, updateUser } from '@/services/iam';

export const useGetUsers = (filters: Record<any, any>, enabled?: boolean): UseQueryResult<any> =>
    useQuery({
        queryKey: ['users', filters],
        queryFn: () => fetchIamUsers(filters),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled
    });

export const useGetRoles = (filters: Record<any, any>, enabled?: boolean): UseQueryResult<any> =>
    useQuery({
        queryKey: ['roles', filters],
        queryFn: () => fetchIamRoles(filters),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled
    });

export const useGetTeams = (filters: Record<any, any>, enabled?: boolean): UseQueryResult<any> =>
    useQuery({
        queryKey: ['teams', filters],
        queryFn: () => fetchIamTeams(filters),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled
    });

export const useAddUser = () => {
    return useMutation({
        mutationFn: (payload: any) => addUser(payload),
    });
};

export const useAddTeam = () => {
    return useMutation({
        mutationFn: (payload: any) => addTeam(payload),
    });
};

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: (payload: any) => updateUser(payload),
    });
};

export const useUpdateTeam = () => {
    return useMutation({
        mutationFn: (payload: any) => updateTeam(payload),
    });
};

export const useDeleteUser = () => {
    return useMutation({
        mutationFn: (user_id: any) => deleteUser(user_id),
    });
};

export const useDeleteTeam= () => {
    return useMutation({
        mutationFn: (team_id: any) => deleteTeam(team_id),
    });
};