interface project {
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

interface responseProject {
  message: string;
  project: project[];
}

interface ProjectState {
  projects: project[];
  error: string | null;
  loading: boolean;
  success: boolean;
  message: string | null;
}
