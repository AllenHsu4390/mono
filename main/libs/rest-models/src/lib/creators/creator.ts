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
  };
};
