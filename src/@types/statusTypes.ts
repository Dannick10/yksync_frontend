export interface status {
  _id: string;
  userId: string;
  projectsTotal: number;
  projectsCurrents: number;
  projectsFinish: number;
  projectsUnfinished: number
}

export interface statusProject {
  _id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  color: string;
}

export interface responseStatus {
  message: string;
  status: status;
  projectsTotal: statusProject[];
  projectsCurrent: statusProject[];
  projectsFinish: statusProject[];
}

export interface statusState {
  status?: status;
  projectTotal?: statusProject[];
  projectsCurrent?: statusProject[];
  projectsFinish?: statusProject[] ;
  error: string | null;
  sucess: boolean;
  loading: boolean;
  message?: string | null;
}
