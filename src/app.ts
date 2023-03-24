import bodyParser from "body-parser";
import express, { Express, Request, Response, Router } from 'express';
import session from "express-session";
import { departmentRoute } from "./routes/department-route";
import { doctorLevelRoute } from "./routes/doctor-level-route";
import { doctorRoute } from "./routes/doctor-route";
import { hospitalRoute } from "./routes/hospital-route";
import { userRoute } from "./routes/user-route";
import { keycloak, memoryStore } from "./utils/keycloak-setup";
import { httpRequestLogger, httpResponseLogger } from './utils/loggers';
import { errorHandler } from "./errors/error-handler";

export const app: Express = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(httpRequestLogger);
app.use(httpResponseLogger);
// configing a web session store, make it accessible in the browser.
app.use(
  session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.use(keycloak.middleware());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is Express + TypeScript');
});

const apiRouter = Router();
app.use("/api", apiRouter);
apiRouter.use("/users", userRoute);
apiRouter.use("/departments", departmentRoute);
apiRouter.use("/doctors", doctorRoute);
apiRouter.use("/doctor-levels", doctorLevelRoute);
apiRouter.use("/hospitals", hospitalRoute);

app.use(errorHandler);
