import { TrendResponse } from '@main/rest-models';

export const getTrend = async (pageId: string): Promise<TrendResponse> => {
  return {
    links: {
      assets: {
        rel: 'assets',
        url: `/api/assets/top?pageId=${pageId}`,
      },
    },
  };
};
