"use client";
import { Result, Button } from "antd";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  // Redirect to the homepage or a valid route
  const goHome = () => {
    router.push("/"); // Go to the home page or any other valid route
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={goHome}>
            Back to Home
          </Button>
        }
      />
    </div>
  );
}
