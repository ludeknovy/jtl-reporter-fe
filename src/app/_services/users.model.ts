export interface Users {
  id: string;
  username: string;
  role: UserRole;
}

export enum UserRole {
  Admin = 'admin',
  Operator = 'operator',
  Readonly = 'readonly'
}
