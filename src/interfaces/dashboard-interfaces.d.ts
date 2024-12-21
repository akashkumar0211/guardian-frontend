export type ImpactBreakupKey = 'total' | 'low' | 'medium' | 'high' | 'critical' | 'unknown';

export interface ImpactBreakupData {
  total: ImpactCardData;
  critical: ImpactCardData;
  high: ImpactCardData;
  medium: ImpactCardData;
  low: ImpactCardData;
  unknown: ImpactCardData;
}

export interface ImpactCardData {
  label: string;
  percentage: number;
  count: number;
}


export interface ImpactBreakupCardProps {
  cardData: ImpactCardData;
}

export interface TopFindingData {
  id: string;
  name: string;
  severity: string;
}

export interface GraphDataResponse {
  labels: string[];
  data: Dataset[];
}


export interface Dataset {
  labels: string; 
  data: number[]; 
  backgroundColor: string; 
  borderColor: string; 
}

interface Colors {
  backgroundColor: string;
  borderColor: string;
}


interface ResolutionData{
  label:string;
  days: number;
}

export interface AverageResolutionTime {
  critical: ResolutionData;
  high: ResolutionData;
  medium: ResolutionData;
  low: ResolutionData;
}

export interface ResolutionCircleProps {
  days: number | string;
  label:string;
}

export interface TopFindingItem{
    cwe_title: string;
    percentage: number;
    B:number,
    G:number,
    R:number,
    count:number,
    percentageString:string
}


interface Filters {
  tags: string[];
  service_ids: string[];
  cwe_ids: string[];
}

interface DashboardFilterStore {
  filters: Filters;
  setTags: (tags: string[]) => void;
  setServices: (serviceIds: string[]) => void;
  setCWEIds: (cweIds: string[]) => void;
  resetFilters: () => void;
}