import { Assist } from "./Assist";
export interface Employee {
  userId: number;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  rol: string;
  token: string;
  department: string;
  assists?: Assist[];
}

export type NewEmployee = Omit<Employee, "employeeId" | "token" | "assists">;
export type EmployeeToLogin = Pick<Employee, "email" | "password">;