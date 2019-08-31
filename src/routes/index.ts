import * as express from 'express';

// tslint:disable-next-line: variable-name
export const MainRouter = express.Router();
export { route as VoteRouter } from './vote';
export { route as ChoiceRouter } from './choices';
