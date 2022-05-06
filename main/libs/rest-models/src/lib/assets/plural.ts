import { Pagination } from '../pagination';
import { Asset } from './single';

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
    asset: {
      rel: 'asset';
      url: string;
    }[];
  };
};
