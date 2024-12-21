import { getDetails } from '@/services/api-services';

export const fetchApplications = async (filters: Record<any, any>) => {
  try {
    const url = `/service/all`;
    const queryString = new URLSearchParams(filters).toString();
    return getDetails(`${url}?${queryString}`);
  } catch (error: any) {
    console.error("error", error);
    throw new Error(error.error)
  }
};

export const fetchDefaultVulnerabilityDetails = async (filters: Record<any, any>) => {
    
  try {
    const url = `/service/summary/default`;
    delete filters['id']
    const queryString = new URLSearchParams(filters).toString();
    return getDetails(`${url}?${queryString}`);
  } catch (error: any) {
    console.error("error", error);
    throw new Error(error.error)
  }
};

export const fetchAggregatedVulnerabilityDetails = async (filters: Record<any, any>) => {  

  try {
    const url = `/service/summary/aggregated`;
    if(!filters['id']){
      filters['id']=filters['service_id']
    }
    delete filters['service_id']
    const queryString = new URLSearchParams(filters).toString();
    return getDetails(`${url}?${queryString}`);
  } catch (error: any) {
    console.error("error", error);
    throw new Error(error.error)
  }
};