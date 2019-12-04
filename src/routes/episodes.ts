import * as express from 'express';

import * as ctrls from './episodes.ctrl';

export const route = express.Router();

route.get('/', ctrls.getEpisodeWithNumber);
route.get('/producer', ctrls.getEpisodeWithProducer);
