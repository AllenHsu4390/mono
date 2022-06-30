import type { AssetsResponse } from '@main/rest-models';
import { useInfiniteQuery } from 'react-query';

export const useAssets = (assets: AssetsResponse) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery<AssetsResponse, Error>(
      ['assets', assets.links.next],
      async ({
        pageParam: nextUrl = assets.links.next,
      }: {
        pageParam?: string;
      }) => {
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
          return lastPage.links.next;
        },
      }
    );
  return {
    assets: data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    refetchAssets: refetch,
  };
};
