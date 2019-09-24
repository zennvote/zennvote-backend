import { Request, Response } from 'express';

import { getEpisodeData } from '../utils/sheet';
import { getQuizzes } from '../utils/quiz';

export const getEpisode = async (req: Request, res: Response) => {
  const { episode, index } = req.params;
  res.json(await getEpisodeData(Number(episode), Number(index)));
};

export const getQuiz = async (req: Request, res: Response) => {
  res.json(await getQuizzes());
};
