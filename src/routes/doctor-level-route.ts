import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { DoctorLevelService } from "../services/doctor-level-service";

export const doctorLevelRoute = Router();
doctorLevelRoute.get("/", asyncHandler(async (req: Request, res: Response) => {
  const data = await DoctorLevelService.findAll();
  res.json({ data });
}));