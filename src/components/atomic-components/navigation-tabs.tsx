import React from 'react';
import { Tabs } from 'antd';
import { TabsComponentProps } from '@/interfaces/common-interfaces';

export const NavigationTabs: React.FC<TabsComponentProps> = ({
  defaultActiveKey = '1',
  centered = false,
  items,
  onTabChange
}) => {
  return (
    <Tabs
      // className={'w-[30%]'}
      defaultActiveKey={defaultActiveKey}
      centered={centered}
      onChange={onTabChange}
      items={items.map(({ label, key, children, icon }) => ({
        key,
        label: (
          <span className='flex gap-2'>
            {icon}
            {label}
          </span>
        ),
        children,
      }))}
    />
  );
};