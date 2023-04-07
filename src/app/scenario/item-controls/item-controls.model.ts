export interface ItemParams {
  id: string;
  projectName: string;
  scenarioName: string;
}

export interface ItemInput {
  note?: string;
  environment: string;
  isBase?: boolean;
  hostname?: string;
  params: ItemParams;
  name: string;
  resourcesLink?: string;
}
