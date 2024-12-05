import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const transport = axios.create({ withCredentials: true });

export const getDetails = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    transport.get<T>(url, config)
      .then((response: AxiosResponse<T>) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => reject(error));
  });
};

export const addDetails = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    transport.post<T>(url, data, config)
      .then((response: AxiosResponse<T>) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => reject(error));
  });
};

export const updateDetails = async <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    transport.put<T>(url, data, config)
      .then((response: AxiosResponse<T>) => {
        resolve(response.data);
      })
      .catch((error: AxiosError) => reject(error));
  });
};

export const deleteDetails = async <T>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
  return new Promise((resolve, reject) => {
    transport.delete<T>(url, config)
      .then((response: AxiosResponse<T>) => resolve(response.data))
      .catch((error: AxiosError) => reject(error));
  });
};
