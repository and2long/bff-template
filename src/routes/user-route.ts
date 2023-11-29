import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { UserService } from "../services/user-service";
import { HTTPStatusCode } from "@and2long/lib-commons";
import { keycloak } from "../utils/keycloak-setup";

export const userRoute = Router();
userRoute.get("/", keycloak.protect(), asyncHandler(async (req: Request, res: Response) => {
  const data = await UserService.findAll();
  res.json(data);
}));


userRoute.post("/", asyncHandler(async (req: Request, res: Response) => {
  const data = await UserService.createUser(req.body);
  res.status(HTTPStatusCode.CREATED).json(data);
}));
