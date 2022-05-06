import { Creator } from '../creators/single';

export interface Asset {
  id: string;
  src: string;
  creator: Creator;
}

export type AssetResponse = Asset & {
  links: {
    like: {
      rel: 'like';
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
