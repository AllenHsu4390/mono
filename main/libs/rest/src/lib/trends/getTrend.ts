import { TrendResponse } from '@main/rest-models';

export const getTrend = async (): Promise<TrendResponse> => {
  return {
    links: {
      assets: {
        rel: 'assets',
        url: `/api/assets/top?pageId=1`,
      },
    },
  };
};
