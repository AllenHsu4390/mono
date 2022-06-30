import { CategoriesResponse } from '@main/rest-models';

export const getCategories = (): CategoriesResponse => {
  return {
    categories: [
      'misc',
      'pets',
      'cats',
      'dogs',
      'nightlife',
      'nature',
      'games',
      'basketball',
      'soccer',
      'sports',
      'cooking',
      'cafe',
      'dessert',
      'restaurant',
      'relax',
    ],
  };
};
