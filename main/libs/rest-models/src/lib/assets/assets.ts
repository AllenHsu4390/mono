import { Pagination } from '../pagination';
import { Asset } from './asset';

export interface Assets {
  assets: Asset[];
  pagination: Pagination;
}

export type AssetsResponse = Assets & {
  links: {
    next?: {
      rel: 'next';
      url: string;
    };
    assets: {
      rel: 'assets';
      url: string;
    }[];
  };
};
