import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import _ from "lodash";
import { UserService } from "../services/user-service";

export const userRoute = Router();
userRoute.get("/", asyncHandler(async (req: Request, res: Response) => {
  const data = await UserService.findAll();
  res.json({ data });
}));

userRoute.post("/", asyncHandler(async (req: Request, res: Response) => {
  const data = await UserService.createUser(req.body);
  res.status(data.code).json(_.omit(data, ["code"]));
}));
