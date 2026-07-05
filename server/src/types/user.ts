export type UserRole = "admin" | "member";

export interface User {
  readonly id: string;
  name: string;
  email: string;
  role: UserRole;
  bio?: string;
}
