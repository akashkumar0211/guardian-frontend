
export interface SMTPDialogProps {
    isModalOpen: boolean;
    smtpData?: any
    setIsModalOpen: (isOpen: boolean) => void;
};

export interface PolicyDialogProps {
    isModalOpen: boolean;
    policyData?: any
    setIsModalOpen: (isOpen: boolean) => void;
    setEditPolicyData: (state: any) => void;
};


export interface TokenDialogProps {
    isModalOpen: boolean;
    setIsModalOpen: (state: any) => void;
}


export interface TokenRecord {
    Label: string;
    CreatedAt: string;
    ExpiryDate: string;
    LastAccessed: string;
  }


export interface VulnerabilityItem {
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';
    count: number;
}


export interface PolicyFormInterface {
    id?: string
    type?: string,
    name: string,
    critical: number,
    high: number,
    medium: number,
    low: number,
    smtpId: string,
    email?: string[],
    scanTypes: string[],
    sendAlerts: boolean,
    breakPipeline: boolean,
    serviceid?: string[],
    tags?: string[],
}