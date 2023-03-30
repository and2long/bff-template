import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatusCode } from "../constants/http-status-code";
import { AppointmentService } from "../services/appointment-service";

export const appointmentRoute = Router();
appointmentRoute.get("/", asyncHandler(async (req: Request, res: Response) => {
  const data = await AppointmentService.findAll();
  res.json({ data });
}));

appointmentRoute.post("/", asyncHandler(async (req: Request, res: Response) => {
  const data = await AppointmentService.createAppointment(req.body);
  res.status(HTTPStatusCode.CREATED).json(data);
}));
