import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { DoctorService } from "../services/doctor-service";

export const doctorRoute = Router();
doctorRoute.get("/", asyncHandler(async (req: Request, res: Response) => {
  const data = await DoctorService.findAll();
  res.json({ data });
}));