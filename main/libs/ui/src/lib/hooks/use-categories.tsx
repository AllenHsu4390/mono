import type { CategoriesResponse } from '@main/rest-models';
import { atom, useAtom } from 'jotai';
import { useQuery } from 'react-query';
import { useGuest } from './use-guest';

const currentCategoryAtom = atom<string>('misc');

export const useCategories = () => {
  const { guest } = useGuest();
  const [currentCategory, setCurrentCategory] = useAtom(currentCategoryAtom);
  const { data, isLoading, isError } = useQuery<CategoriesResponse>(
    ['categories'],
    async () => {
      if (!guest?.links.categories) {
        throw new Error('Missing capability: categories');
      }

      const res = await fetch(guest.links.categories);
      return res.json();
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    categories: data ? data.categories : ['misc'],
    currentCategory,
    setCurrentCategory,
    isError,
    isLoading,
  };
};
