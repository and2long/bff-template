import { NextFunction } from "express";
import request from "supertest";
import { app } from "../../src/app";
import { HTTPStatusCode } from "../../src/constants/http-status-code";
import { AppointmentService } from "../../src/services/appointment-service";
import { keycloak } from "../../src/utils/keycloak-setup";
import * as CommonUtils from "../../src/utils/common";

describe("appointmentRoute", () => {
  const url = "/api/appointments";
  const title = "title";
  const introduction = "introduction";
  const departmentIds = [ 1, 2 ];
  const startTime = "2023-04-07T17:00:00+08:00";
  const endTime = "2023-04-07T17:30:00+08:00";
  const userId = "5e51c943-213e-4f1e-907b-1b076f784268";
  const payload = { title, introduction, departmentIds, startTime, endTime };
  const mockAppointmentCreationResponse = { appointmentId: 1 };
  let mockKeycloakProtectHandler: jest.Mock;

  beforeEach(() => {
    mockKeycloakProtectHandler = jest.fn().mockImplementation((req: Request, res: Response, next: NextFunction) => {
      next();
    });
    jest.spyOn(keycloak, "protect").mockReturnValue(mockKeycloakProtectHandler);
  });

  afterEach(() => {
    mockKeycloakProtectHandler.mockReset();
  });

  describe("POST / - create appointment", () => {
    it("should protect by keycloak", async () => {
      await request(app).post(url).send(payload);
      expect(mockKeycloakProtectHandler).toHaveBeenCalledTimes(1);
    });

    describe("payload validation", () => {
      beforeEach(() => {
        jest.spyOn(CommonUtils, "getUserId").mockResolvedValue(userId);
      });

      it("should pass validation and invoke appointment service", async () => {
        jest.spyOn(AppointmentService, "createAppointment").mockResolvedValue(mockAppointmentCreationResponse);
        await request(app).post(url).send(payload).expect(HTTPStatusCode.CREATED)
          .expect(mockAppointmentCreationResponse);
      });

      it("should fail validation when payload is empty", async () => {
        await request(app).post(url).send({}).expect(HTTPStatusCode.BAD_REQUEST)
          .expect({});
      });
    });
  });
});