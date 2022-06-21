import { environment } from '@main/environment';
import { CreatorResponse, User } from '@main/rest-models';

export const getCreator = async (
  id: string,
  user?: User | null
): Promise<CreatorResponse> => {
  const db = environment.db;
  return {
    ...(await db.creator.get(id)),
    links: {
      assets: `/api/assets?creatorId=${id}&pageId=1`,
      gallery: `/galleries/${id}`,
      ...(user && user.creatorId === id
        ? {
            newAsset: `/api/assets/new`,
          }
        : {}),
    },
  };
};
