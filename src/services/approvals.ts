import { getDetails } from '@/services/api-services';

export const fetchApprovalDetails = async (filters: Record<any, any>) => {
  try {
    const url = `/false_positive/all`;
    const queryString = new URLSearchParams(filters).toString();
    return getDetails(`${url}?${queryString}`);
  } catch (error: any) {
    console.error("error", error);
    throw new Error(error.error)
  }
};