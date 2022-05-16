import { environment } from '@main/environment';
import { FollowsResponse } from '@main/rest-models';

export const getFollows = async (
  userId: string,
  pageId: string
): Promise<FollowsResponse> => {
  const db = environment.db;
  const follows = await db.get.follows(userId, pageId);

  return {
    ...follows,
    links: {
      follow: follows.follows.map((f) => ({
        rel: 'follow',
        url: `/galleries/${f.creator.id}`,
      })),
      ...(follows.pagination.next
        ? {
            next: {
              rel: 'next',
              url: `/api/follows?pageId=${follows.pagination.next}`,
            },
          }
        : {}),
    },
  };
};
