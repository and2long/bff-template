import express, { Express, Request, Response } from 'express';
import { setup } from './utils/db-setup';

setup().then(() => {
  console.log('db connect success.');
}
).catch(() => {
  console.log("db connect error.");
});

export const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is Express + TypeScript');
});

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});