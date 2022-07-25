import type { AssetResponse, LikesCountResponse } from '@main/rest-models';
import { atom, useAtom } from 'jotai';
import { useState } from 'react';
import { useQuery } from 'react-query';

const useCounter = () => {
  const [state, setState] = useState({
    count: 0,
    isInitial: true,
  });
  return {
    state,
    setCount: (count: number) =>
      setState({
        isInitial: false,
        count,
      }),
  };
};

const likeCountLoadingAtom = atom(false);

export const useLikeCount = ({
  asset,
  refetchInterval,
}: {
  asset: AssetResponse;
  refetchInterval?: number;
}) => {
  const [isLikeCountLoading, setIsLikeCountLoading] =
    useAtom(likeCountLoadingAtom);
  const counter = useCounter();
  const {
    isLoading,
    isError,
    data,
    refetch: refetchLikes,
  } = useQuery(
    ['likes', asset.id],
    async (): Promise<LikesCountResponse> => {
      const res = await fetch(asset.links.likeCount);
      return res.json();
    },
    {
      refetchInterval,
      onSuccess: counter.state.isInitial
        ? (likesData) => counter.setCount(likesData.count)
        : undefined,
    }
  );

  return {
    counter,
    likes: data,
    refetchLikes,
    isError,
    isLoading,
    isLikeCountLoading,
    startLikeCountLoading: () => setIsLikeCountLoading(true),
    stopLikeCountLoading: () => setIsLikeCountLoading(false),
  };
};
