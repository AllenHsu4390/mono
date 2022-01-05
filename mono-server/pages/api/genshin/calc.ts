import type { NextApiRequest, NextApiResponse } from "next";
import { getOutputString, print } from "genshin_calc";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  print("teams");
  res.status(200).json(getOutputString());
}
