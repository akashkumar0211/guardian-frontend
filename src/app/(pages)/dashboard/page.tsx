import { Button } from 'antd'
import { useSession,signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const DashboardPage = () => {
  return (
    <div>
     Dashboard Page
     <Image
            src="/guardianBackgroundImage.svg" 
            alt="Guardian Background"
            width={300}
            height={300}
            unoptimized
          />
    </div>
  )
}

export default DashboardPage