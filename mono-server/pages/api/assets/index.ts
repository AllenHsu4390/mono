import type { NextApiRequest, NextApiResponse } from "next";
import { Assets } from "nft-gallery/models/Assets";

const getRandomNum = () => Math.floor(Math.random() * 206);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Assets>
) {
  const { assetIds }: { assetIds: string[] } = req.body;
  let numbers;
  let prev = getRandomNum();
  let next: number | undefined = getRandomNum();

  if (next > 200) {
    next = undefined;
  }

  if (assetIds) {
    numbers = assetIds;
  } else {
    numbers = Array(10)
      .fill(0)
      .map(() => `${getRandomNum()}`);
  }
  res.status(200).json({
    assets: numbers.map((number) => {
      return {
        id: number,
        src: `https://source.unsplash.com/collection/${number}`,
      };
    }),
    pagination: {
      prev: `${prev}`,
      next: `${next}`,
      total: 100,
    },
  });
  return res;
}
