import { useMutation } from '@tanstack/react-query';
import { userLogin } from '@/services/auth';
import { decodeJWT } from '@/utils/jwt-utils';
import { signIn } from 'next-auth/react';
import { message } from 'antd';

export function useLogin(): any {
  return useMutation({
    mutationFn: (formData) => userLogin(formData),
    onSuccess: (data: any) => {
        const token = decodeJWT(data.token)
        signIn("credentials", { email: token.email, name: token.name }).catch(
          (err) => console.error("error in signin", err)
        )
      },
    onError: (error: any) => {
    message.error(error?.response?.data?.error || 'Something went wrong')
    }
  },
  );
}