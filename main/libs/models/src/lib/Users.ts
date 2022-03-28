import { User } from './User';
import { Pagination } from './Pagination';

export interface Users {
  users: User[];
  pagination: Pagination;
}
