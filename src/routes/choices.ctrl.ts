import { Request, Response } from 'express';

import { getChoices } from '../utils/choices';
import { ChoiceType } from '../models/choice';

export const getNewChoices = async (req: Request, res: Response) => {
  res.json(await getChoices(ChoiceType.new));
};

export const getUnitChoices = async (req: Request, res: Response) => {
  res.json(await getChoices(ChoiceType.unit));
};

export const getGrowChoices = async (req: Request, res: Response) => {
  res.json(await getChoices(ChoiceType.grow));
};
