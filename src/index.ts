import * as express from 'express';
import routes from './routes';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello world!');
});

app.use('/api', routes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

export default app;
