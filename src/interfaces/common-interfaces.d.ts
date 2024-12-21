import { ReactNode } from "react";

export interface QueryClientProviderLayoutProps {
  children: ReactNode;
}

export interface PageInfo {
  page: number;
  size: number;
  service_id?: string;  // If you have a service_id
}

export interface AuthHeadersResponse {
  headers: {
    Authorization: string;
  };
}

export interface CustomCredentialsRequest {
  email?: string;
  name?: string;
}

export interface GetTokenParams<T = boolean> {
  req: NextRequest;
  secret: string;
  raw?: boolean;
  encryption?: boolean;
  salt?: string;
}

export interface MenuItem{
  label: string;
  icon: ReactNode;
  route: string;
  childRoutes?: MenuItem[];
}


export interface InfiniteScrollTableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  rowKey: string;
  hasMore: boolean;
  pageInfo: PageInfo;
  isLoading:boolean,
  style?:any,
  type?:string
  rowSelection?:boolean
  setPageInfo: ({ page, size }: PageInfo) => void;
  fetchData: ({}) => any;

}

type TabItem = {
  label: string;
  key: string;
  children: React.ReactNode;
  icon?: React.ReactNode; 
};

interface TabsComponentProps {
  defaultActiveKey?: string;
  centered?: boolean;
  items: TabItem[];
  onTabChange?: (activeKey: string) => void; 
}


export interface MultiSelectProps {
  options: { label: string; value: string | number }[];
  onChange?: (selectedValues: (string | number)[]) => void; 
  placeholder?: string; 
  isLoading?: boolean; 
  allowClear?: boolean; 
  defaultValue?: (string | number)[]; 
  maxTagCount?:number
  mode?:string
}


export interface Option{
  label:string;
  value:string
}