import { readFilePromise } from './file';

export const getQuizzes = async () => {
  const rawJSON = await readFilePromise('./data/quizzes.json');
  const value = JSON.parse(rawJSON);
  return value;
};