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
  apis: string[];
  methodology: string;
  tests: string[];
  deploy: string;
  cicd: string;
  rollback: string;
  documentation: string;
  updateDocumentation: string;
  projectManager: string;
  supportLead: string;
  supportTeam: string[];
  supportAvailable: string;
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
}

interface responseProjectId {
  message: string;
  project: project;
}

interface ProjectState {
  project: project | undefined,
  projects: project[];
  error: string | null;
  loading: boolean;
  success: boolean;
  message: string | null;
}
