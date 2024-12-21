import { Spin } from 'antd';
import React from 'react'

const LoadingPage = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spin size="large" />
        </div>
      );
}

export default LoadingPage