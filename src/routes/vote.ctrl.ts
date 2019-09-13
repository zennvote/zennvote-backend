import { Request, Response } from 'express';
import { Vote, VoteData } from '../models/vote.model';
import { createVote, updateVote } from '../models/vote';

export const postVote = async (req: Request, res: Response) => {
  const vote: Vote = req.body;
  try {
    await createVote(vote);
    res.end();
  } catch (err) {
    console.error(err);
    res.end();
  }
};

export const putVote = async (req: Request, res: Response) => {
  const vote = req.body as VoteData;
  const { email } = req.session as Express.Session;
  if (!email) {
    res.status(401).json({ message: 'not authorized' });
  }
  try {
    await updateVote({ email }, vote);
    res.end();
  } catch (err) {
    console.error(err);
    res.end();
  }
};
