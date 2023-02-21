import bodyParser from "body-parser";
import express, { Express, Request, Response, Router } from 'express';
import { userRoute } from "./routes/user-route";
import { keycloak } from "./utils/keycloak-setup";
import { httpRequestLogger, httpResponseLogger } from './utils/loggers';

export const app: Express = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(httpRequestLogger);
app.use(httpResponseLogger);
app.use(keycloak.middleware());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is Express + TypeScript');
});

const apiV1Router = Router();
app.use("/api/users", apiV1Router);
apiV1Router.use("/", userRoute);
