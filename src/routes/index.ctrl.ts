import { Request, Response } from 'express';

import { getEpisodeData } from '../utils/sheet';

export const getEpisode = async (req: Request, res: Response) => {
  const { episode, index } = req.params;
  res.json(await getEpisodeData(Number(episode), Number(index)));
};
