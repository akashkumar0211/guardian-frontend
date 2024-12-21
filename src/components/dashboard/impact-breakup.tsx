'use client'
import React from 'react';
import { ImpactBreakupCard } from './impact-breakup-card';
import { useImpactBreakup } from '@/queries/dashboard';
import { useDashboardFilterStore } from '@/store/dashboard-filter-store';

export const ImpactBreakupSection = () => {
  const { filters } = useDashboardFilterStore();
  const { data: impactBreakupData, isLoading } = useImpactBreakup(filters);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!impactBreakupData) {
    return <p>No Data Found...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 border rounded">
      <ImpactBreakupCard cardData={impactBreakupData.total} />
      <ImpactBreakupCard cardData={impactBreakupData.critical} />
      <ImpactBreakupCard cardData={impactBreakupData.high} />
      <ImpactBreakupCard cardData={impactBreakupData.medium} />
      <ImpactBreakupCard cardData={impactBreakupData.low} />
      <ImpactBreakupCard cardData={impactBreakupData.unknown} />
    </div>
  );
};
