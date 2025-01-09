export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
}

export interface IUpdateUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth: Date;
}

export interface PaginatedResponse {
  users: IUser[];
  paginate: {
    page: number;
    limit: number;
    totalPages: number;
    totalElements: number;
  };
}
