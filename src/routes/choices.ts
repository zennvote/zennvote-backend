import * as express from 'express';

import * as ctrls from './choices.ctrl';

export const route = express.Router();

route.get('/unit', ctrls.getUnitChoices);
route.get('/new', ctrls.getNewChoices);
route.get('/grow', ctrls.getGrowChoices);
