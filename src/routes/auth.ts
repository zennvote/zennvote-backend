import * as express from 'express';

import * as ctrls from './auth.ctrl';

export const route = express.Router();

route.post('/login', ctrls.login);
route.get('/check', ctrls.checkLogin);
