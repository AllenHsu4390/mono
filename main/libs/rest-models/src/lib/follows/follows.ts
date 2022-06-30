import { Pagination } from '../pagination';
import { Follow } from './follow';

export interface Follows {
  follows: Follow[];
  pagination: Pagination;
}

export type FollowsResponse = Follows & {
  links: {
    next?: string;
    follows: string[];
  };
};
