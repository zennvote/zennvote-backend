import * as express from 'express';

import * as ctrls from './vote.ctrl';

export const route = express.Router();

route.post('/', ctrls.postVote);
route.put('/', ctrls.putVote);
