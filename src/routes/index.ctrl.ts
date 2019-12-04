import { Request, Response } from 'express';

import { getEpisodeData } from '../utils/sheet';
import { getQuizzes } from '../utils/quiz';
import { isUndefined } from 'util';

export const getQuiz = async (req: Request, res: Response) => {
  const { index } = req.query;
  const quizzes = await getQuizzes();
  res.json(quizzes[index]);
};

export const getQuizLength = async (req: Request, res: Response) => {
  const { length } = await getQuizzes();
  res.json(length);
}
