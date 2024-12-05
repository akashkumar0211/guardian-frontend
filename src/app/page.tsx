'use client'

import { useRouter } from "next/navigation";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDetails } from "@/services/api-services";
import { signOut } from "next-auth/react";
import { AxiosError } from "axios";

interface CheckResponse {
  // Define the response structure from the API (adjust based on actual response)
  status: string;
  message: string;
}

export default function Home() {  
  const router = useRouter();

  const { data: check = [] }: any = useQuery({
    queryKey: ['check'],
    queryFn: async () => {
      const apiUrl = `${process.env.hostport}/api/v1/rbac/users/auth/check`;
      return await getDetails(apiUrl, {});
    },
    // onError: (error: AxiosError) => {
    //   // Handle the error here (for example, sign out the user)
    //   console.error(error); // Optional: log error for debugging purposes
    //   signOut();
    // },
    enabled: true,
    refetchOnWindowFocus: false,
    retry: false,
    select: () => {
      const queryParams = new URLSearchParams(window.location.search);
      let redirect = '';
      queryParams.forEach((value, key) => {
        if (key === 'redirect') {
          redirect = value;
        }
      });

      let routes = redirect.split('/');
      if (routes[routes.length - 1].length > 0) {
        router.push(redirect);
      } else {
        router.push("/dashboard");
      }
    },
  });

  return <></>;
}
