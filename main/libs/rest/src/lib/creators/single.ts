import { environment } from '@main/environment';
import { Creator } from '@main/models';
import { CreatorResponse } from '../responses';

export const getCreator = async (
  id: string
): Promise<Creator & CreatorResponse> => {
  const db = environment().db;
  return {
    ...(await db.get.creator(id)),
    links: [
      {
        rel: 'assets',
        url: '/api/assets?pageId=0',
      },
    ],
  };
};
