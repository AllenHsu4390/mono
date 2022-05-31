import { environment } from '@main/environment';
import { CreatorResponse } from '@main/rest-models';

export const getCreatorOrNull = async (
  id: string
): Promise<CreatorResponse> => {
  try {
    return await getCreator(id);
  } catch (e) {
    return null;
  }
};

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
