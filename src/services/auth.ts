import { addDetails } from '@/services/api-services'; 

export const userLogin = async (formData:any) => {
    return await addDetails(`/user/login`, formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  };
  