export interface ProjectsListing {
  id: string;
  projectName: string;
  itemCount: number;
  scenarioCount: number;
  latestRun: string;
}

export interface NewProjectBody {
  projectName: string;
  allowedUsers?: string[]
}
