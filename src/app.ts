import express, { Express, Request, Response, Router } from 'express';
import { userRoute } from "./routes/user-route";

const app: Express = express();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is Express + TypeScript');
});

const apiV1Router = Router();
app.use("/api/users", apiV1Router);
apiV1Router.use("/", userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is Express + TypeScript');
});

export default app;