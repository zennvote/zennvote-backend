import * as express from 'express';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

import * as routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello world!');
});

app.use('/api', routes.MainRouter);
app.use('/api/vote', routes.VoteRouter);
app.use('/api/choices', routes.ChoiceRouter);

mongoose.connect(process.env.MONGO_URI as string, { useNewUrlParser: true })
  .then(() => console.log('Server connected to mongodb'))
  .catch((err: Error) => console.error(err));

app.listen(3000, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
