import { Request, Response } from 'express';

import * as vote from '../models/vote';

export const login = async (req: Request, res: Response) => {
  const session = req.session as Express.Session;
  const { email, password } = req.body;
  const result = await vote.getVote({ email });

  if (result === null) {
    res.status(404).json({ message: 'user not found' });
    return;
  }
  if (result.password !== password) {
    res.status(401).json({ message: 'wrong password' });
    return;
  }

  session.email = email;
  res.status(200).json({ message: 'success' });
};
