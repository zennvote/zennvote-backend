import * as express from 'express';

import * as ctrl from './index.ctrl';

// tslint:disable-next-line: variable-name
export const MainRouter = express.Router();
export { route as VoteRouter } from './vote';
export { route as ChoiceRouter } from './choices';
export { route as AuthRouter } from './auth';

MainRouter.get('/episode/:episode/:index', ctrl.getEpisode);
