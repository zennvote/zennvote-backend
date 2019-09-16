import { Request, Response } from 'express';

import * as vote from '../models/vote';
import { encryptPassword } from '../utils/crypt';

export const login = async (req: Request, res: Response) => {
  const session = req.session as Express.Session;
  const { email, password } = req.body;
  const result = await vote.getVote({ email });

  if (session.email) {
    res.status(403).json({ message: 'already authed '});
    return;
  }
  if (result === null) {
    res.status(404).json({ message: 'user not found' });
    return;
  }
  const { salt } = result;
  const hashPassword = encryptPassword(password, salt);
  if (result.password !== hashPassword) {
    res.status(401).json({ message: 'wrong password' });
    return;
  }

  session.email = email;
  res.status(200).json({ message: 'success' });
};
