import { Nullable } from "primereact/ts-helpers";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  dateOfBirth: Date;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  dateOfBirth: Nullable<Date>;
}
