import { environment } from '@main/environment';
import { FollowsResponse } from '@main/rest-models';

export const getFollows = async (
  userId: string,
  pageId: string
): Promise<FollowsResponse> => {
  const db = environment.db;
  const page = await db.get.follows(userId, pageId);

  return {
    ...page,
    links: {
      follow: page.follows.map((f) => ({
        rel: 'follow',
        url: `/galleries/${f.creator.id}`,
      })),
      ...(page.pagination.next
        ? {
            next: {
              rel: 'next',
              url: `/api/follows?pageId=${page.pagination.next}`,
            },
          }
        : {}),
    },
  };
};
