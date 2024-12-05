
export interface QueryClientProviderLayoutProps {
  children: ReactNode;
}

export interface PageInfo {
  page: number;
  pageSize: number;
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
