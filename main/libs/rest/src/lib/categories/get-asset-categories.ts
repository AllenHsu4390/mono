import { environment } from '@main/environment';
import { CategoriesResponse } from '@main/rest-models';

export const getAssetCategories = async (
  assetId: string
): Promise<CategoriesResponse> => {
  const { db } = environment;

  const categories = await db.category.get(assetId);

  return {
    categories,
  };
};
