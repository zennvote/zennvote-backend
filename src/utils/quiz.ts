import { readFilePromise } from './file';

export type Quiz = { title: string, choices: string[] };

export const getQuizzes = async () => {
  const rawJSON = await readFilePromise('./data/quizzes.json');
  const value = JSON.parse(rawJSON);
  return value as Quiz[];
};