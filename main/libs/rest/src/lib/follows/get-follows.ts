import { environment } from '@main/environment';
import { FollowsResponse } from '@main/rest-models';

export const getFollows = async (
  userId: string,
  pageId: string
): Promise<FollowsResponse> => {
  const db = environment.db;
  const page = await db.follows.get(userId, pageId);

  return {
    ...page,
    links: {
      follows: page.follows.map((f) => `/galleries/${f.creator.id}`),
      ...(page.pagination.next
        ? {
            next: `/api/follows?pageId=${page.pagination.next}`,
          }
        : {}),
    },
  };
};
