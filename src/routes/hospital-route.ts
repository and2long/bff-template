import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { HospitalService } from "../services/hospital-service";

export const hospitalRoute = Router();
hospitalRoute.get("/", asyncHandler(async (req: Request, res: Response) => {
  const data = await HospitalService.findAll();
  res.json({ data });
}));