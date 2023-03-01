import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { DepartmentService } from "../services/department-service";

export const departmentRoute = Router();
departmentRoute.get("/", asyncHandler(async (req: Request, res: Response) => {
  const data = await DepartmentService.findAll();
  res.json({ data });
}));