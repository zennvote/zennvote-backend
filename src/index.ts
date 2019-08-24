import * as express from 'express';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello world!');
});

app.use('/api', routes);

require('mongoose').Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI as string, { useNewUrlParser: true })
  .then(() => console.log('Server connected to mongodb'))
  .catch((err: Error) => console.error(err));

app.listen(3000, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
