import type { NextApiRequest, NextApiResponse } from "next";
import { Asset } from "../../../models/Asset";

const getRandomNum = () => Math.floor(Math.random() * 206);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Asset>
) {
  const { id } = req.query;
  res.status(200).json({
    id: `${id}`,
    src: `https://source.unsplash.com/collection/${id}`,
  });
  return res;
}
