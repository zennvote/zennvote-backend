import * as express from 'express';

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
