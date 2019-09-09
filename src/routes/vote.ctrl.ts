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
  const vote: VoteData = req.body;
  try {
    // Temp code in email part. Delete it after implement account function.
    await updateVote({ email: 'qjfrntop12@naver.com' }, vote);
    res.end();
  } catch (err) {
    console.error(err);
    res.end();
  }
};
