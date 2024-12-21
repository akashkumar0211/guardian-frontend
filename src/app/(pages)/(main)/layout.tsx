'use client'
import { ErrorBoundary } from "react-error-boundary";
import dynamic from "next/dynamic";
import Sidebar from "@/components/sidebar/sidebar";
const ErrorFallbackComponent = dynamic(() => import("@/components/error/error-boundary").then((res) => {
    return res.ErrorFallbackComponent;
}), {
    ssr: false
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const handleReset = () => {
        window.location.href = '/dashboard'
    }
    return (
        <html lang="en">
            <body>
                <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
                    <div className="flex h-screen">
                        <Sidebar />
                        <div className="w-full">{children}</div>
                    </div>
                </ErrorBoundary>

            </body>
        </html >
    );
}
