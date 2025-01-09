export interface PaginateParams {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: 0 | 1 | -1;
}

export interface IPagination {
  page: number;
  limit: number;
  totalPages: number;
  totalElements: number;
}

export interface PaginatedUsers {
  users: any[];
  paginate: IPagination;
}
