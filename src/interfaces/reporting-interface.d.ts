export interface FormData {
  name: string;
  templates: string[];
  applicationsOrTags: string[];
  type?:string
}

export type KeyValuePair = {
  key: string;
  value: string;
};

export type ScanTypeKey = {
  label: string;
  value: string;
};

export type ScanType = "Severity" | "Status" | "Scan Type";
export type Category = 'severity' | 'status' | 'scan_type';

export type DisplayField = {
  label: string;
  value: string;
};

export interface ScheduleDialogProps {
  isModalOpen: boolean;
  setIsModalOpen: (state: any) => void;
}

export interface TemplateDialogProps{
  templateName: string,
  setTemplateName: (name: string) => void,
  onNext: () => void
}


interface StepOneFormProps {
  formData: {
    type: 'applications' | 'tags';
    name: string;
    template_id?: string;
    applications?: string[];
    tags?: string[];
  };
  step: number;
  stepOneForm: any; 
  updateFormData: (data: any) => void;
  navigateToStep: (step: number, form?: any) => void;
  handleClose: () => void;
}

interface StepTwoFormProps {
  formData: {
      emails: string[];
      smtp_id?: string;
  };
  stepTwoForm: any;
  updateFormData: (data: any) => void;
  navigateToStep: (step: number, form?: any) => void;
}

interface StepThreeFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  updateFormData:(data:any)=>void;
  stepThreeForm:any,
  isLoading:boolean,
  initialData?: any;
}

export interface ScheduleDialogProps {
  isModalOpen: boolean;
  setIsModalOpen: (state: any) => void;
}