'use client'
import React, { useState } from 'react';
import { Card, Tooltip, Image } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { NavigationTabs } from '@/components/atomic-components/navigation-tabs';
import { useGetSecurityTools } from '@/queries/integrations';
import { securityToolsTabs } from '@/utils/tabs-data';
import { capitalizeFirstLetter } from '@/utils/common-utils';
import { IntegrationsDescriptionComp } from '@/components/atomic-components/integration-description';

const SecurityToolsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('sast');
  const { data: securityTools, isLoading } = useGetSecurityTools({})

  const renderToolCard = (tool: any) => {
    return tool.tool_type === activeTab && (
      <Card
        key={tool.id}
        className="w-52 shadow-md hover:shadow-lg transition-shadow group relative cursor-pointer"
      >
        <div className="flex items-center justify-center h-full">
          <Image
            preview={false}
            src={`/${capitalizeFirstLetter(tool?.name)}.svg`}
            alt={tool.name}
            height={115}
            width={115}
          />
        </div>

        {/* Settings icon container */}

        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
          <Tooltip title="Tool Settings">
            <div className="bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition-colors flex items-center ">
              <SettingOutlined className="text-gray-600 text-lg" />
            </div>
          </Tooltip>
        </div>
      </Card>
    );
  };


  const handleTabChange = (activeKey: string) => {
    setActiveTab(activeKey);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavigationTabs items={securityToolsTabs} onTabChange={handleTabChange} />
      <IntegrationsDescriptionComp scan={activeTab} />
      <div className=' flex gap-2 flex-wrap'>
        {securityTools?.[0]?.tools?.map((tool: any) => renderToolCard(tool))}
      </div>
    </div>
  );
};

export default SecurityToolsDashboard;