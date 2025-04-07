
export type TechStacksWithCounts = Record<string, number>;

export interface stacks {
  stacks: any;
  frontend: TechStacksWithCounts;
  backend: TechStacksWithCounts;
  database: TechStacksWithCounts;
  tests: TechStacksWithCounts;
}

export interface responseStacks {
  message: string;
  stacks?: stacks;
}

export interface stackState {
  stacks?: stacks;
  error: string | null;
  sucess: boolean;
  loading: boolean;
  message?: string | null;
}
