import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { UserService } from "../services/user-service";

export const userRoute = Router();
userRoute.get("/", asyncHandler(async (req: Request, res: Response) => {
  const users = await UserService.findAllUsers();
  res.json({ users });
}));