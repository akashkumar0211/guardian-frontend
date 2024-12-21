import { addDetails, deleteDetails, getDetails, updateDetails } from '@/services/api-services';

export const fetchSmtpDetails = async (filters: Record<any, any>) => {
  try {
    const url = `/settings/listSMTPUser`;
    const queryString = new URLSearchParams(filters).toString();
    return getDetails(`${url}?${queryString}`);
  } catch (error: any) {
    console.error("error", error);
    throw new Error(error.error)
  }
};

export const fetchPolicyDetails = async (filters: Record<any, any>) => {
  try {
    const url = `/policy/list`;
    const queryString = new URLSearchParams(filters).toString();
    return getDetails(`${url}?${queryString}`);
  } catch (error: any) {
    console.error("error", error);
    throw new Error(error.error)
  }
};

export const fetchTokenDetails = async (filters: Record<any, any>) => {
  try {
    const url = `/settings/token/list`;
    const queryString = new URLSearchParams(filters).toString();
    return getDetails(`${url}?${queryString}`);
  } catch (error: any) {
    console.error("error", error);
    throw new Error(error.error)
  }
};

export const addSmtpDetails = (payload: any) => {
  try {
    const url = `/settings/createSMTPUser`;
    return addDetails(url, payload)
  } catch (error: any) {
    console.error("error adding smtp", error);
    throw new Error(error.error)
  }
}

export const addPolicy = (payload: any) => {
  try {
    const url = `/policy/add`;
    return addDetails(url, payload)
  } catch (error: any) {
    console.error("error adding smtp", error);
    throw new Error(error.error)
  }
}

export const addToken = (payload: any) => {
  try {
    const url = `/settings/token/add`;
    return addDetails(url, payload)
  } catch (error: any) {
    console.error("error adding smtp", error);
    throw new Error(error.error)
  }
}

export const updateSmtpDetails = (payload: any) => {
  try {
    const url = `/settings/editSMTPUser?id=${payload['id']}`;
    return updateDetails(url, payload)
  } catch (error: any) {
    console.error("error updating smtp", error);
    throw new Error(error.error)
  }
}


export const updatePolicy = (payload: any) => {
  try {
    const url = `/policy/update`;
    return updateDetails(url, payload)
  } catch (error: any) {
    console.error("error updating smtp", error);
    throw new Error(error.error)
  }
}

export const deleteSmtpDetails = (smtp_id: any) => {
  try {
    const url = `/settings/deleteSMTPUser/${smtp_id}`;
    return deleteDetails(url, {})
  } catch (error: any) {
    console.error("error adding smtp", error);
    throw new Error(error.error)
  }
}


export const deletePolicy = (policy_id: string) => {
  try {
    let payload = {
      'Content-Type': 'application/json'
    }
    const url = `/policy/delete`;
    return deleteDetails(url, { ...payload, data: { id: policy_id } })
  } catch (error: any) {
    console.error("error deleting policy", error);
    throw new Error(error.error)
  }
}


export const deleteToken = (token_id: string) => {
  try {
    const url = `/settings/token/delete/${token_id}`;
    return deleteDetails(url, {})
  } catch (error: any) {
    console.error("error deleting policy", error);
    throw new Error(error.error)
  }
}