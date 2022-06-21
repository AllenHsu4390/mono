import { Creator } from '../creators/creator';

export interface Asset {
  id: string;
  src: string;
  creator: Creator;
}

export type AssetResponse = Asset & {
  links: {
    like?: string;
    delete?: string;
    likeCount: string;
    creator: string;
  };
};
