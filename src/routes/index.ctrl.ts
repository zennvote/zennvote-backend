import { Request, Response } from 'express';

import { getEpisodeData, getProducers } from '../utils/sheet';
import { getQuizzes } from '../utils/quiz';
import { isUndefined } from 'util';

export const getQuiz = async (req: Request, res: Response) => {
  const quizzes = await getQuizzes();
  res.json(quizzes);
};

export const getQuizLength = async (req: Request, res: Response) => {
  const { length } = await getQuizzes();
  res.json(length);
};

export const getProducerNames = async (req: Request, res: Response) => {
  const result = (await getProducers()).sort();
  res.json(result);
}
