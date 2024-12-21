import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { addReport, addSchedule, addTemplate, deleteReport, deleteSchedule, deleteTemplate, fetchReports, fetchSchedules, fetchTemplates, updateTemplate } from '@/services/reporting';

export const useTemplates = (filters: Record<any, any>, enabled?: boolean): UseQueryResult<any> =>
    useQuery({
        queryKey: ['templates', filters],
        queryFn: () => fetchTemplates(filters),
        refetchOnWindowFocus: false,
        retry: false,
        enabled: enabled,
        staleTime: 1000 * 60 * 5
    });

export const useReports = (filters: Record<any, any>): UseQueryResult<any> =>
    useQuery({
        queryKey: ['reports', filters],
        queryFn: () => fetchReports(filters),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5
    });
    
export const useSchedules = (filters: Record<any, any>): UseQueryResult<any> =>
    useQuery({
        queryKey: ['schedules', filters],
        queryFn: () => fetchSchedules(filters),
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 5
    });


export const useAddReport = () => {
    return useMutation({
        mutationFn: (payload: any) => addReport(payload),
    });
};

export const useAddTemplate = () => {
    return useMutation({
        mutationFn: (payload: any) => addTemplate(payload),
    });
}

export const useAddSchedule = () => {
    return useMutation({
        mutationFn: (payload: any) => addSchedule(payload),
    });
};

export const useUpdateTemplate = () => {
    return useMutation({
        mutationFn: (payload: any) => updateTemplate(payload),
    });
}

export const useDeleteReport = () => {
    return useMutation({
        mutationFn: (report_id: string) => deleteReport(report_id)
    });
}

export const useDeleteSchedule = () => {
    return useMutation({
        mutationFn: (schedule_id: string) => deleteSchedule(schedule_id)
    });
}

export const useDeleteTemplate = () => {
    return useMutation({
        mutationFn: (template_id: string) => deleteTemplate(template_id)
    });
}

