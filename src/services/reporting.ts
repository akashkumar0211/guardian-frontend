import { addDetails, deleteDetails, getDetails, updateDetails } from '@/services/api-services';

export const fetchTemplates = async (filters: Record<any, any>) => {
  try {
    const url = `/reports/templates`;
    const queryString = new URLSearchParams(filters).toString();
    return getDetails(`${url}?${queryString}`);
  } catch (error: any) {
    console.error("error", error);
    throw new Error(error.error)
  }
};

export const fetchReports = async (filters: Record<any, any>) => {
  try {
    const url = `/reports`;
    const queryString = new URLSearchParams(filters).toString();
    return getDetails(`${url}?${queryString}`);
  } catch (error: any) {
    console.error("error", error);
    throw new Error(error.error)
  }
};

export const fetchSchedules = async (filters: Record<any, any>) => {
  try {
    const url = `/reports/schedules`;
    const queryString = new URLSearchParams(filters).toString();
    return getDetails(`${url}?${queryString}`);
  } catch (error: any) {
    console.error("error", error);
    throw new Error(error.error)
  }
};

export const addReport=async (payload:any)=>{
  try {
    const url=`/reports`;
    return addDetails(url,payload)
  } catch (error:any) {
    console.error("error adding report", error);
    throw new Error(error.error)
  }
}
export const addTemplate=async (payload:any)=>{
  try {
    const url=`/reports/templates`;
    return addDetails(url,payload)
  } catch (error:any) {
    console.error("error adding report", error);
    throw new Error(error.error)
  }
}
export const addSchedule=async (payload:any)=>{
  try {
    const url=`/reports/schedules`;
    return addDetails(url,payload)
  } catch (error:any) {
    console.error("error adding report", error);
    throw new Error(error.error)
  }
}

export const updateTemplate=async (payload:any)=>{
  try {
    const url=`/reports/templates/${payload['id']}`;
    delete payload['id']
    return updateDetails(url,payload)
  } catch (error:any) {
    console.error("error adding report", error);
    throw new Error(error.error)
  }
}

export const deleteReport=async (report_id:string)=>{
  try {
    const url=`/reports/delete/${report_id}`;
    return deleteDetails(url,{})
  } catch (error:any) {
    console.error("error adding report", error);
    throw new Error(error.error)
  }
}

export const deleteSchedule=async (schedule_id:string)=>{
  try {
    const url=`/reports/schedules/delete/${schedule_id}`;
    return deleteDetails(url,{})
  } catch (error:any) {
    console.error("error adding report", error);
    throw new Error(error.error)
  }
}

export const deleteTemplate=async (template_id:string)=>{
  try {
    const url=`/reports/templates/delete/${template_id}`;
    return deleteDetails(url,{})
  } catch (error:any) {
    console.error("error adding report", error);
    throw new Error(error.error)
  }
}
