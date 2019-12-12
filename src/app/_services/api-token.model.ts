export interface ApiKey {
  description: string;
  token: string;
  createDate: string;
  createdBy: string;
}

export interface NewTokenReponse {
  token: string;
}
