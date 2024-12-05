import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import QueryClientProviderLayout from "@/utils/tanstack-query-provider"
import SessionWrapper from "@/components/session-wrapper";


export const metadata: Metadata = {
  title: "Guardian",
  description: "A application scanning tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <QueryClientProviderLayout>
            <AntdRegistry>{children}</AntdRegistry>
          </QueryClientProviderLayout>
        </SessionWrapper>
      </body>
    </html>
  );
}
