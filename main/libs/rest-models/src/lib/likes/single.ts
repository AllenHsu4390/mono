export interface Like {
  userId: string;
  assetId: string;
}

export interface Drop {
  isDropped: boolean;
  assetId: string;
}

export type LikeResponse = Like;
export type DropResponse = Drop;
