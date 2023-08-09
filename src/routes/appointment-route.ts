import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { AppointmentService } from "../services/appointment-service";
import { keycloak } from "../utils/keycloak-setup";
import { AppointmentCreationPayload } from "../interfaces/appointment";
import { getUserId } from "../utils/common";
import { validateRequest } from "../validators/validate-request";
import { createAppointmentRules } from "../validators/appointment-validator";
import { HTTPStatusCode } from "@and2long/lib-commons";

export const appointmentRoute = Router();
appointmentRoute.get("/", asyncHandler(async (req: Request, res: Response) => {
  const data = await AppointmentService.findAll();
  res.json({ data });
}));

appointmentRoute.post("/",
  keycloak.protect(),
  validateRequest(createAppointmentRules),
  asyncHandler(async (req: Request, res: Response) => {
    const { title, introduction, departmentIds, participantIds, startTime, endTime } = req.body;
    const creatorId = await getUserId(req, res);
    const payload: AppointmentCreationPayload = {
      creatorId,
      title,
      introduction,
      departmentIds,
      participantIds,
      startTime,
      endTime,
    };
    const data = await AppointmentService.createAppointment(payload);
    res.status(HTTPStatusCode.CREATED).json(data);
  }));
