import { ImpactBreakupData, GraphDataResponse, AverageResolutionTime, TopFindingItem } from '@/interfaces/dashboard-interfaces';
import { getDetails } from '@/services/api-services';

export const fetchImpactBreakup = async (filters: Record<string, any>): Promise<ImpactBreakupData> => {
  try {
    let baseUrl = `/dashboard/impact_breakup?tools=container&tools=iac&tools=sast&tools=dast&`;
    const finalUrl = `${baseUrl}${queryBuilder(filters)}`;
    return getDetails<ImpactBreakupData>(finalUrl);
  } catch (error: any) {
    console.error("impact breakp", error);
    throw new Error(error.error)
  }
};

export const fetchTrendGraphData = async (filters: Record<any, any>): Promise<GraphDataResponse> => {
  try {
    let baseUrl = `/dashboard/impact_trend?tools=container&tools=iac&tools=sast&tools=dast&`;
    const finalUrl = `${baseUrl}${queryBuilder(filters)}`; 
    return await getDetails<GraphDataResponse>(finalUrl);
  } catch (error: any) {
    console.error("trend graph data", error);
    throw new Error("Something went wrong")
  }
};

export const fetchAverageResolutionTime = async (filters: Record<string, string>): Promise<AverageResolutionTime> => {
  try {
    const baseUrl = `/dashboard/resolved/average?tools=container&tools=iac&tools=sast&tools=dast&`;
    const finalUrl = `${baseUrl}${queryBuilder(filters)}`; 
    return getDetails<AverageResolutionTime>(finalUrl);
  } catch (error) {
    console.error("average resolution time", error);
    throw new Error("Something went wrong")
  }

};


export const fetchTopFindings = async (filters: Record<string, string>): Promise<TopFindingItem[]> => {
  try {
    const baseUrl = `/dashboard/top_impact?`;
    const finalUrl = `${baseUrl}${queryBuilder(filters)}`; 
    return getDetails(finalUrl);
  } catch (error) {
    console.error("top findings", error);
    throw new Error("Something went wrong")

  }
};

export const fetchTags = async (): Promise<string[]> => {
  try {
    return await getDetails(`/dashboard/tags`);
  } catch (error) {
    console.error("tags", error);
    throw new Error("Something went wrong")
  }
};

export const fetchServices = async (filters: Record<string, any>): Promise<any[]> => {
  try {
    const queryParts: string[] = [];
    if (filters?.tags?.length) {
      queryParts.push(`filter=tags|in|${filters['tags'].join("%3B")}|string`);
    }
    return await getDetails(`/dashboard/services${queryParts.length ? `?${queryParts.join("&")}` : ""}`);
  } catch (error) {
    console.error("services", error);
    throw new Error("Something went wrong")
  }
};

export const fetchCreatedVsResolvedTrend = async (filters: Record<string, string>) => {
  try {
    const baseUrl = `/dashboard/createdvsresolved/trend?`;
    const finalUrl = `${baseUrl}${queryBuilder(filters)}`; 
    return getDetails(finalUrl);
  } catch (error) {
    console.error("created vs resolved", error);
    throw new Error("Something went wrong")

  }

};

export const fetchCreatedVsResolvedTable = async (filters: Record<string, string>) => {
  const query = new URLSearchParams(filters).toString();
  return await getDetails(`/dashboard/createdvsresolved/breakup?${query}`);
};

export const fetchOwaspTopTen = async (filters: Record<string, string>) => {
  return await getDetails(`/dashboard/owasp/topten`);
};


const queryBuilder=(filters:Record<string,any>):string=>{
  const queryParts: string[] = [];
  if (filters?.dates?.length) {
    queryParts.push(`filter=date|gt|${filters.dates[0]}`)
    queryParts.push(`filter=date|lt|${filters.dates[1]}`)
  }
  if (filters['tags']?.length) {
    queryParts.push(`filter=tags|in|${filters['tags'].join("%3B")}|string`);
  }
  if (filters['service_ids']?.length) {
    queryParts.push(`filter=serviceid|in|${filters['service_ids'].join("%3B")}|string`);
  }

  return queryParts.length?queryParts.join("&"):""
  
}