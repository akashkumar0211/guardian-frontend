import { 
    DashboardOutlined, 
    AppstoreOutlined, 
    SettingOutlined, 
    CheckCircleOutlined, 
    BarChartOutlined, 
    TeamOutlined, 
    ArrowRightOutlined, 
    ApiOutlined,      
    BranchesOutlined, 
    SearchOutlined,  
    RobotOutlined,    
    MailOutlined,     
    LogoutOutlined,
    LockOutlined
  } from "@ant-design/icons";
  import { ReactNode } from 'react';

export interface MenuItem {
  label: string;
  icon: ReactNode;
  route: string;
  childRoutes?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <DashboardOutlined />, route: "/dashboard" },
  { label: "Applications", icon: <AppstoreOutlined />, route: "/applications" },
  { label: "IAM", icon: <TeamOutlined />, route: "/iam" },
  { 
    label: "Settings", 
    icon: <SettingOutlined />,
    route: "/settings",
    childRoutes: [
      { label: "General", icon: <ArrowRightOutlined />, route: "/settings/general" },
      { label: "Policies", icon: <ArrowRightOutlined />, route: "/settings/policies" },
      { label: "SMTP", icon: <MailOutlined />, route: "/settings/smtp" }
    ]
  },
  { 
    label: "Integrations", 
    icon: <ApiOutlined />, 
    route: "/integrations", 
    childRoutes: [
      { label: "Scan", icon: <SearchOutlined />, route: "/integrations/scan" },
      { label: "AI", icon: <RobotOutlined />, route: "/integrations/ai" },
      { label: "Git", icon: <BranchesOutlined />, route: "/integrations/git" }
    ]
  },
  { label: "Reporting", icon: <BarChartOutlined />, route: "/reporting" },
  { label: "Approvals", icon: <CheckCircleOutlined />, route: "/approvals" },
];

export const otherItems: MenuItem[] = [
  { label: "Logout", icon: <LogoutOutlined />, route: '/logout' },
  { label: "Reset Password", icon: <LockOutlined />, route: "/reset-password" },
];