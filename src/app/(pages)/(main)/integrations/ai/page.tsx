'use client'
import { Card, Tooltip, Image, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useGetAITools } from '@/queries/integrations';
import { useState } from 'react';
import { ConfigureAIDialog } from '@/components/integrations/configure-ai-dialog';
import { IntegrationsDescriptionComp } from '@/components/atomic-components/integration-description';

const AIToolsDashboard: React.FC = () => {
  const { data: aiTools } = useGetAITools({})
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentDialogData, setCurrentDialogData] = useState<any>({})

  const handleToolClick = (tool: any) => {
    setCurrentDialogData(tool)
    setIsModalOpen(true)
  }

  const renderToolCard = (tool: any) => {

    return <Card
      key={tool.id}
      className="w-52 shadow-md hover:shadow-lg transition-shadow group relative cursor-pointer"
    >
      <div className="flex flex-col items-center justify-center h-full">
        <Image src={`/${tool.name}.svg`} alt={""} height={115} width={115} preview={false} />
        <Typography className='font-semibold'>{tool.display_name}</Typography>
      </div>


      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
        <Tooltip title="Tool Settings">
          <div className="bg-gray-200 rounded-md p-2 hover:bg-gray-300 transition-colors flex items-center ">
            <SettingOutlined className="text-gray-600 text-lg" onClick={() => handleToolClick(tool)} />
          </div>
        </Tooltip>
      </div>
    </Card>
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <IntegrationsDescriptionComp scan={'ai'} />
      <div className=' flex gap-2 flex-wrap'>
        {aiTools?.map((tool: any) => renderToolCard(tool))}
      </div>
      <ConfigureAIDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} aiData={currentDialogData} />
    </div>
  );
};

export default AIToolsDashboard;