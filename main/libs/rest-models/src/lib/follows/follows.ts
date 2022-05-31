import { Pagination } from '../pagination';
import { Follow } from './single';

export interface Follows {
  follows: Follow[];
  pagination: Pagination;
}

export type FollowsResponse = Follows & {
  links: {
    next?: {
      rel: 'next';
      url: string;
    };
    follow: {
      rel: 'follow';
      url: string;
    }[];
  };
};
