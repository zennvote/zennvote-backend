import { Request, Response } from 'express';
import { isUndefined } from 'util';

import { getEpisodeData, getEpisodesWithProducer } from '../utils/sheet';

export const getEpisodeWithNumber = async (req: Request, res: Response) => {
  const { episode, index } = req.query;
  const episodeData = await getEpisodeData(Number(episode), Number(index));

  if (isUndefined(episodeData)) {
    res.status(404).json({ episode, index, message: 'no episode' });
    return;
  }

  res.json({ ...episodeData, episode, index });
};

export const getEpisodeWithProducer = async (req: Request, res: Response) => {
  const { producer } = req.query;
  const episodeData = await getEpisodesWithProducer(producer);

  if (isUndefined(episodeData)) {
    res.status(404).json({ producer, message: 'no producer' });
    return;
  }

  res.json({ producer, episodes: episodeData });
};
