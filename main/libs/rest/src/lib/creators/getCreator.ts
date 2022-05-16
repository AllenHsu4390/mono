import { environment } from '@main/environment';
import { CreatorResponse } from '@main/rest-models';

export const getCreator = async (id: string): Promise<CreatorResponse> => {
  const db = environment.db;
  return {
    ...(await db.get.creator(id)),
    links: {
      assets: {
        rel: 'assets',
        url: `/api/assets?creatorId=${id}&pageId=1`,
      },
    },
  };
};
