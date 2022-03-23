import type { NextApiRequest, NextApiResponse } from "next";
import { Creator } from "../../../models/Creator";
import { Error } from "../../../models/Error";

const getRandomNum = () => Math.floor(Math.random() * 206);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Creator | Error>
) {
  const { id } = req.query;
  const numbers = Array(10)
    .fill(0)
    .map(() => `${getRandomNum()}`);

  if (typeof id !== "string") {
    res.status(403).json({
      message: "Something went wrong",
    });
  } else {
    const creator = {
      id,
      avatarUrl: `https://source.unsplash.com/collection/${id}`,
      assetIds: numbers,
      desc: "Hi, I'm a creator. I make cool things. Check out my work!",
    };
    res.status(200).json(creator);
  }
}
