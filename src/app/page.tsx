'use client'

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getDetails } from "@/services/api-services";
import { useEffect } from "react";

export default function Home() {  
  const router = useRouter();

  useEffect(()=>{
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
  },[])

  const { data: check = [] }: any = useQuery({
    queryKey: ['check'],
    queryFn: async () => {
      const apiUrl = `${process.env.hostport}/api/v1/rbac/users/auth/check`;
      return await getDetails(apiUrl, {});
    },
    enabled: true,
    refetchOnWindowFocus: false,
    retry: false
  });

  return <></>;
}
