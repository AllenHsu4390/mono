import { Creator } from '../creators/creator';

export interface Asset {
  id: string;
  src: string;
  creator: Creator;
}

export type AssetResponse = Asset & {
  links: {
    like?: {
      rel: 'like';
      url: string;
    };
    delete?: {
      rel: 'delete';
      url: string;
    };
    likeCount: {
      rel: 'like-count';
      url: string;
    };
    creator: {
      rel: 'creator';
      url: string;
    };
  };
};
