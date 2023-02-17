import { Router } from "express";
import { userRoute } from "./routes/user-route";
import { app } from "./server";

const apiV1Router = Router();
app.use("/api/v1/users", apiV1Router);
apiV1Router.use("/", userRoute);