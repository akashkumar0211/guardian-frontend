export interface GitFormData{
    id?:string
    name:string;
    owner:string;
    url:string;
    provider?:string;
    private_access_token?:string
    access_token?:string
}

export interface GitCredentialRow {
    provider?: string;
    name: string;
    owner: string;
    [key: string]: any;
}

export interface GitDialogProps {
    isModalOpen: boolean;
    setIsModalOpen: (state: boolean) => void;
    gitData?:any
    setGitData?:(state:any)=>void
}

export interface AIDialogProps {
    aiData:any;
    isModalOpen: boolean;
    setIsModalOpen: (state: boolean) => void;
}

export interface AddAITokenDialogProps {
    tokenData:any;
    isModalOpen: boolean;
    setIsModalOpen: (state: boolean) => void;
    setTokenData: (state: any) => void;
}