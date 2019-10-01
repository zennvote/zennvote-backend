import { Request, Response } from 'express';

import { getEpisodeData } from '../utils/sheet';
import { getQuizzes } from '../utils/quiz';
import { isUndefined } from 'util';

export const getEpisode = async (req: Request, res: Response) => {
  const { episode, index } = req.query;
  const episodeData = await getEpisodeData(Number(episode), Number(index));

  if (isUndefined(episodeData)) {
    res.status(404).json({ message: 'no episode' });
    return;
  }

  res.json(await getEpisodeData(Number(episode), Number(index)));
};

export const getQuiz = async (req: Request, res: Response) => {
  const { index } = req.query;
  const quizzes = await getQuizzes();
  res.json(quizzes[index]);
};

export const getQuizLength = async (req: Request, res: Response) => {
  const { length } = await getQuizzes();
  res.json(length);
}
