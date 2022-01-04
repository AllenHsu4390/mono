import { getOutputString, print } from 'genshin_calc';

export default function handler(req, res) {
    print('teams');
    res.status(200).json(getOutputString());
  }
  