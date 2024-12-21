import { DashboardFilterStore, Filters } from '@/interfaces/dashboard-interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultFilters: Filters = {
  tags: [],
  service_ids: [],
  cwe_ids: [],
};

export const useDashboardFilterStore = create<DashboardFilterStore>()(
  persist(
    (set) => ({
      filters: defaultFilters,
      setTags: (tags: string[]) =>
        set((state) => ({
          filters: { ...state.filters, tags },
        })),
      setServices: (serviceIds: string[]) =>
        set((state) => ({
          filters: { ...state.filters, service_ids: serviceIds },
        })),
      setCWEIds: (cweIds: string[]) =>
        set((state) => ({
          filters: { ...state.filters, cwe_ids: cweIds },
        })),
      resetFilters: () => set({ filters: { ...defaultFilters } }),
    }),
    { name: 'dashboard-filter-store' }
  )
);
