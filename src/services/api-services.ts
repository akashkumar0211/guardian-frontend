import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const transport = axios.create({ withCredentials: true,baseURL:`${process.env.hostport}/api/v1` });

export const getDetails = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await transport.get<T>(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addDetails = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await transport.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDetails = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await transport.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDetails = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await transport.delete<T>(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
