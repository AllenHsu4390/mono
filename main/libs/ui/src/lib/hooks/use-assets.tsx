import { AssetsResponse } from '@main/rest-models';
import { useInfiniteQuery } from 'react-query';

export const useAssets = (assetsUrl?: string) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery<AssetsResponse, Error>(
      assetsUrl || 'missing-assets',
      async ({ pageParam: nextUrl = assetsUrl }: { pageParam?: string }) => {
        if (nextUrl) {
          const response = await fetch(nextUrl);
          return response.json();
        }
        return {
          assets: [],
          links: {},
        };
      },
      {
        getNextPageParam: (lastPage): undefined | string => {
          return lastPage.links.next?.url;
        },
      }
    );
  return {
    assets: data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  };
};
