import { Assets } from '@main/models';
import { AssetsResponse, CreatorResponse } from '@main/rest';
import { useInfiniteQuery } from 'react-query';


export const useAssets = (creator: CreatorResponse) => {
  const assetsUrl = creator.links.find((link) => link.rel === 'assets')?.url || '/404';
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery<Assets & AssetsResponse, Error>(
      assetsUrl,
      async ({ pageParam: nextUrl = assetsUrl }: { pageParam?: string }) => {
        const response = await fetch(nextUrl);
        return response.json();
      },
      {
        getNextPageParam: (lastPage): undefined | string => {
          return lastPage.links.find((l) => l.rel === 'next')?.url;
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