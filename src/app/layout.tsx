import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import QueryClientProviderLayout from "@/utils/tanstack-query-provider"
import SessionWrapper from "@/components/session/session-wrapper";
import { ConfigProvider, Button } from "antd";

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
                <ConfigProvider
                    theme={{
                        token: {
                          colorPrimary: '#2b7873',
                          fontFamily:'Prompt, sans-serif',
                          colorError: '#d44849', // Change this to your desired error color
                          colorErrorBorderHover: '#FF7875', 
                        },
                      }}
                >
                    <SessionWrapper>
                        <QueryClientProviderLayout>
                            <AntdRegistry>
                                {children}
                            </AntdRegistry>
                        </QueryClientProviderLayout>
                    </SessionWrapper>
                </ConfigProvider>
            </body>
        </html >
    );
}
