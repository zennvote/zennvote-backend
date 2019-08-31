import { readFilePromise } from './file';
import { ChoiceType } from '../models/choice';
import { getProducers } from './sheet';

export const getChoices = async (type: ChoiceType) => {
  if (type === ChoiceType.grow) {
    return await getChoicesFromSheet();
  }
  return getChoicesFromJSON(type);
};

const getChoicesFromJSON = async (type: ChoiceType) => {
  const rawJSON = await readFilePromise('./data/choices.json');
  const value = JSON.parse(rawJSON);
  return type === ChoiceType.unit ? value.unit : value.new;
};

const getChoicesFromSheet = async () => await getProducers();
