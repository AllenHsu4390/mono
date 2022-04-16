import { environment } from '@main/environment';
import { Follows } from '@main/models';
import { FollowsResponse } from '../responses';

export const getFollows = async (
  userId: string,
  pageId: string
): Promise<Follows & FollowsResponse> => {
  const db = environment().db;
  const follows = await db.get.follows(userId, pageId);
  const links = [
    ...follows.follows.map((f) => ({
      rel: 'follow',
      url: `/${f.creator.id}`,
    })),
  ];

  if (follows.pagination.next) {
    links.push({
      rel: 'next',
      url: `/api/follows?pageId=${follows.pagination.next}`,
    });
  }

  return {
    ...follows,
    links,
  } as Follows & FollowsResponse;
};
