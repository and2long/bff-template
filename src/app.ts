import bodyParser from "body-parser";
import express, { Express, Router } from "express";
import session from "express-session";
import { userRoute } from "./routes/user-route";
import { keycloak, memoryStore } from "./utils/keycloak-setup";
import { httpRequestLogger, httpResponseLogger } from "./utils/loggers";
import { errorHandler } from "./errors/error-handler";
import cors from "cors";

export const app: Express = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(httpRequestLogger);
app.use(httpResponseLogger);
// configing a web session store, make it accessible in the browser.
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.use(keycloak.middleware());

const apiRouter = Router();
app.use("/api", apiRouter);
apiRouter.use("/users", userRoute);

app.use(errorHandler);
