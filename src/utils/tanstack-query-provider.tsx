'use client'
import { useState } from "react";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import { QueryClientProviderLayoutProps } from "@/interfaces/common-interfaces";

export default function QueryClientProviderLayout({children}: QueryClientProviderLayoutProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
