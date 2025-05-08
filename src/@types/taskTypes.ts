export interface Task {
  _id: string;
  userId: string;
  projectId: string;
  title: string;
  status: string;
  description: string;
}

export interface statusTask {
  status: "pending" | "current" | "finish";
}

export interface responseTask {
  task: any;
  message: string;
  tasks: Task[];
}

export interface taskState {
  tasks?: Task[];
  error: string | null;
  success: boolean;
  loading: boolean;
  message?: string | null;
}
