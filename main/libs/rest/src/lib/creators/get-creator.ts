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
      assets: {
        rel: 'assets',
        url: `/api/assets?creatorId=${id}&pageId=1`,
      },
      gallery: {
        rel: 'gallery',
        url: `/galleries/${id}`,
      },
      ...(user && user.creatorId === id
        ? {
            newAsset: {
              rel: 'new-asset',
              url: `/api/assets/new?creatorId=${id}`,
            },
          }
        : {}),
    },
  };
};
