import { TabItem } from "@/interfaces/common-interfaces";
import { FileOutlined, BarChartOutlined, CalendarOutlined } from '@ant-design/icons';

export const reportsTabs: TabItem[] = [
  { label: 'Templates', key: 'templates', children: '', icon: <FileOutlined /> },
  { label: 'Reports', key: 'reports', children: '', icon: <BarChartOutlined /> },
  { label: 'Schedules', key: 'schedules', children: '', icon: <CalendarOutlined /> },
];

export const securityToolsTabs:TabItem[] = [
  { label: 'SAST', key: 'sast', children: '', icon: <FileOutlined /> },
  { label: 'SCA', key: 'sca', children: '', icon: <BarChartOutlined /> },
  { label: 'IAC', key: 'iac', children: '', icon: <CalendarOutlined /> },
  { label: 'CONTAINER', key: 'container', children: '', icon: <CalendarOutlined /> },
  { label: 'DAST', key: 'dast', children: '', icon: <CalendarOutlined /> },
];

export const iamTabs:TabItem[]=[
  { label: 'Users', key: 'users', children: '', icon: <FileOutlined /> },
  { label: 'Teams', key: 'teams', children: '', icon: <CalendarOutlined /> },
  { label: 'Roles', key: 'roles', children: '', icon: <BarChartOutlined /> },
]