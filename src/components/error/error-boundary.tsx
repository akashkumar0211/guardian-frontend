'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Result } from 'antd';
import { FallbackProps } from 'react-error-boundary';

export const ErrorFallbackComponent = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const router = useRouter();
  const isDevelopment = process.env.NODE_ENV === 'development';

  const errorSubtitle = isDevelopment
    ? `Sorry, something went wrong. Error: ${error.message}`
    : 'Sorry, something went wrong. Please try again later.';

  return (
    <div className="flex justify-center mt-36">
      <Result
        status="500"
        title="500"
        subTitle={errorSubtitle}
        extra={
          <Button
            type="primary"
            onClick={() => {
              resetErrorBoundary();
              router.push('/dashboard');
            }}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};
