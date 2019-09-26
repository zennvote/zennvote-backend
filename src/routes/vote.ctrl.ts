import { Request, Response } from 'express';
import { Vote, VoteData } from '../models/vote.model';
import { getVote, createVote, updateVote } from '../models/vote';
import { getSalt, encryptPassword } from '../utils/crypt';

export const postVote = (req: Request, res: Response) => {
  if (getVote({ email: req.body.email }) !== null) {
    res.status(403).json({ message: 'email already exist' });
    return;
  }
  const vote: Vote = req.body;
  vote.salt = getSalt();
  vote.password = encryptPassword(vote.password, vote.salt);

  const action = async () => await createVote(vote);
  tryActionOnRoute(action, res.end);
};

export const putVote = (req: Request, res: Response) => {
  const vote = req.body as VoteData;
  const { email } = req.session as Express.Session;
  if (!email) {
    res.status(401).json({ message: 'not authorized' });
    return;
  }

  const action = async () => await updateVote({ email }, vote);
  tryActionOnRoute(action, res.end);
};

const tryActionOnRoute = async (action: () => Promise<any>, done?: () => void) => {
  try {
    await action();
  } catch (err) {
    console.error(err);
  } finally {
    if (done) {
      done();
    }
  }
};
