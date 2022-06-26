import { CategoriesResponse } from '@main/rest-models';

export const getCategories = (): CategoriesResponse => {
  return {
    categories: ['pets', 'nightlife', 'nature', 'games', 'misc'],
  };
};
