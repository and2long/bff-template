import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTPStatusCode } from "../constants/http-status-code";
import { AppointmentService } from "../services/appointment-service";
import { keycloak } from "../utils/keycloak-setup";
import { AppointmentCreationPayload } from "../interfaces/appointment";
import { getUserId } from "../utils/common";

export const appointmentRoute = Router();
appointmentRoute.get("/", asyncHandler(async (req: Request, res: Response) => {
  const data = await AppointmentService.findAll();
  res.json({ data });
}));

appointmentRoute.post("/", keycloak.protect(), asyncHandler(async (req: Request, res: Response) => {
  const { title, introduction, departmentIds, startTime, endTime } = req.body;
  const creatorId = await getUserId(req, res);
  const payload: AppointmentCreationPayload = {
    creatorId,
    title,
    introduction,
    departmentIds,
    startTime,
    endTime,
  };
  const data = await AppointmentService.createAppointment(payload);
  res.status(HTTPStatusCode.CREATED).json(data);
}));
