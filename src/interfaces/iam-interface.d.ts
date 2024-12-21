export interface UserCreationDialogProps {
    isModalOpen: boolean;
    editUserData:any;
    setIsModalOpen: (state: any) => void;
  }

export interface UserFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    teams: string[];
    roles: string[];
}
export interface TeamDialogProps {
  isModalOpen: boolean;
  editTeamData:any
  selectedApplications:any
  setSelectedApplications: (state: any) => void;
  setIsModalOpen: (state: any) => void;
  setEditTeamData: (state: any) => void;
}
