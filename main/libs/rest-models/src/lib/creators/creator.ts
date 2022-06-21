export interface Creator {
  id: string;
  name: string;
  desc: string;
  avatarUrl: string;
}

export type CreatorResponse = Creator & {
  links: {
    assets: string;
    newAsset?: string;
    gallery: string;
  };
};
