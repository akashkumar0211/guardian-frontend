import { Colors } from "@/interfaces/dashboard-interfaces";
import {
  WarningOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  FireOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
export const colors: Colors[] = [
  { backgroundColor: '#ff6384', borderColor: '#ff6384' },
  { backgroundColor: '#36a2eb', borderColor: '#36a2eb' },
  { backgroundColor: '#cc65fe', borderColor: '#cc65fe' },
  { backgroundColor: '#ffce56', borderColor: '#ffce56' },
];

export const topFindingColors = ["#C80008", "#EC605B", "#63B645", "#FFAA27", "#EC605B"];

export const labelColors: Record<string, string> = {
  total: "#4caf50", // Green
  critical: "#f44336", // Red
  high: "#ff9800", // Orange
  medium: "#ffc107", // Yellow
  low: "#2196f3", // Blue
  unknown: "#9e9e9e", // Gray
};

export const labelIcons: Record<string, JSX.Element> = {
  total: <InfoCircleOutlined />,
  critical: <FireOutlined />,
  high: <CloseCircleOutlined/>,
  medium: <WarningOutlined />,
  low: <InfoCircleOutlined />,
  unknown: <QuestionCircleOutlined />,
};