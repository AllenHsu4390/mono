import type { CategoriesResponse } from '@main/rest-models';
import { noop } from 'lodash';
import { createContext, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useGuest } from './use-guest';
import { useUser } from './use-user';

const useCategoriesController = () => {
  const { guest } = useGuest();
  const { user } = useUser();
  const [currentCategory, setCurrentCategory] = useState('misc');
  const { isLoading, isError, data } = useQuery<CategoriesResponse>(
    ['categories'],
    async () => {
      const res = await fetch('/api/categories');
      return res.json();
    }
  );

  return {
    categories: data?.categories,
    currentCategory,
    setCurrentCategory,
    isError,
    isLoading,
  };
};

export const CategoriesContext = createContext<
  ReturnType<typeof useCategoriesController>
>({
  categories: [],
  currentCategory: 'misc',
  setCurrentCategory: noop,
  isError: false,
  isLoading: false,
});

export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useCategoriesController();

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoriesContext);
};
