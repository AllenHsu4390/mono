export interface Creator {
  id: string;
  name: string;
  desc: string;
  avatarUrl: string;
}

export type CreatorResponse = Creator & {
  links: {
    assets: {
      rel: 'assets';
      url: string;
    };
    newAsset?: {
      rel: 'new-asset';
      url: string;
    };
    gallery: {
      rel: 'gallery';
      url: string;
    };
  };
};
