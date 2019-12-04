import * as express from 'express';

import * as ctrl from './index.ctrl';

// tslint:disable-next-line: variable-name
export const MainRouter = express.Router();
export { route as VoteRouter } from './vote';
export { route as ChoiceRouter } from './choices';
export { route as AuthRouter } from './auth';
export { route as EpisodeRouter } from './episodes';

MainRouter.get('/quiz', ctrl.getQuiz);
MainRouter.get('/quiz/length', ctrl.getQuizLength);
