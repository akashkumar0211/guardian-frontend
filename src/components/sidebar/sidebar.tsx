import React, { useState, useEffect } from 'react';
import { Image, Layout, Menu } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { menuItems, otherItems } from '@/constants/sidebar-items';
import { signOut } from 'next-auth/react';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const currentPath = window.location.pathname;
    setSelectedKey(currentPath);
  }, [router]);

  const handleMenuClick = (route: string) => {
    if (route === '/logout') {
      signOut()
    } else {
      setSelectedKey(route);
      router.push(route);
    }
  };

  const renderMenuItems = (items: typeof menuItems) => {
    return items.map((item: any) => {
      if (item.childRoutes) {
        return {
          key: item.route,
          icon: item.icon,
          label: item.label,
          children: item.childRoutes.map((child: any) => ({
            key: child.route,
            icon: child.icon,
            label: child.label,
          })),
        };
      }
      return {
        key: item.route,
        icon: item.icon,
        label: item.label,
      };
    });
  };

  const renderBottomItems = (items: typeof otherItems) => {
    return items.map((item) => ({
      key: item.route,
      icon: item.icon,
      label: item.label,
    }));
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      width={250}
      className="h-screen border-r bg-white border-gray-300 shadow-lg mr-3 relative w-10"
      trigger={null}
    >
      <div className="flex flex-col items-center justify-start gap-2 h-full bg-white">
        {/* Logo */}
        <div className='py-[35px] bg-white cursor-pointer'>
          <Image src='/guardian-logo.svg' preview={false} width={50} onClick={() => { router.push('/dashboard') }} />
        </div>

        {/* Collapse/Expand Icon */}
        <div
          className="absolute right-[-13px] w-7 top-32 z-10 cursor-pointer border border-gray-300 bg-white p-1 rounded-full"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
        </div>

        <Menu
          style={{
            width: collapsed ? '80px' : '250px'
          }}
          mode="inline"
          className="flex-grow border-t m-8 bg-white"
          items={renderMenuItems(menuItems)}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
        />

        <Menu
          style={{
            width: collapsed ? '80px' : '250px'
          }}
          mode="inline"
          className="border-t"
          items={renderBottomItems(otherItems)}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </div>
    </Sider>
  );
};

export default Sidebar;