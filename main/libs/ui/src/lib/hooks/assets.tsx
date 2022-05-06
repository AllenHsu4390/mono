import {
  AssetsResponse,
  CreatorResponse,
  TrendResponse,
} from '@main/rest-models';
import { useInfiniteQuery } from 'react-query';

export const useAssets = (creator: CreatorResponse) => {
  const assetsUrl = creator.links.assets.url;
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery<AssetsResponse, Error>(
      assetsUrl,
      async ({ pageParam: nextUrl = assetsUrl }: { pageParam?: string }) => {
        const response = await fetch(nextUrl);
        return response.json();
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

export const useTopAssets = (trend: TrendResponse) => {
  const assetsUrl = trend.links.assets.url;
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery<AssetsResponse, Error>(
      assetsUrl,
      async ({ pageParam: nextUrl = assetsUrl }: { pageParam?: string }) => {
        const response = await fetch(nextUrl);
        return response.json();
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
