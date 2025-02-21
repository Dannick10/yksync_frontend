interface project {
  _id: string;
  name: string;
  description: string;
  answerable: string;
  startDate: string;
  endDate: string;
  frontend: string[];
  backend: string[];
  database: string[];
  tests: string[];
  deploy: string;
  message: string
}

interface resumeProject {
  _id: string;
  name: string;
  description: string;
  answerable: string;
  startDate: string;
  endDate: string;
}

interface responseProjects {
  message: string;
  project: project[];
  meta: pagination
}

interface responseProjectId {
  message: {message: string};
  project: project;
}

interface pagination {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalProjects: number;
}

interface ProjectState {
  project: project | undefined;
  projects: project[];
  error: string | null;
  loading: boolean;
  success: boolean;
  message: string | null;
  meta: pagination | undefined;
}
