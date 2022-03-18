import type { NextApiRequest, NextApiResponse } from "next";
import { Assets } from "../../models/Assets";

const getRandomNum = () => Math.floor(Math.random() * 206);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Assets>
) {
  const numbers = Array(10)
    .fill(0)
    .map(() => getRandomNum());
  res.status(200).json({
    assets: numbers.map((number) => {
      return {
        id: `${number}`,
        src: `https://source.unsplash.com/collection/${number}`,
      };
    }),
  });
  return res;
}
