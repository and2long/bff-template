import request from "supertest";
import { app } from "../../src/app";
import { HTTPStatusCode } from "../../src/constants/http-status-code";
import { AppointmentService } from "../../src/services/appointment-service";
import * as CommonUtils from "../../src/utils/common";
import { protectRouteSpy } from "../setup";
import { ApiErrorType } from "../../src/errors/api-error-type";

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

  describe("POST / - create appointment", () => {

    it("should protect by keycloak", async () => {
      await request(app).post(url).send(payload);
      expect(protectRouteSpy).toHaveBeenCalledTimes(1);
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
        const response = await request(app).post(url).send({});
        expect(response.status).toBe(HTTPStatusCode.BAD_REQUEST);
        expect(response.body.type).toBe(ApiErrorType.validation);
        expect(response.body.invalidParams).toEqual([
          { name: "title", reason: "Missing parameter" },
          { name: "introduction", reason: "Missing parameter" },
          { name: "startTime", reason: "Missing parameter" },
          { name: "endTime", reason: "Missing parameter" },
          { name: "departmentIds", reason: "Missing parameter" },
        ]);
      });

      it("should fail validation when title is empty", async () => {
        const response = await request(app).post(url).send({ ...payload, title: "" });
        expect(response.status).toBe(HTTPStatusCode.BAD_REQUEST);
        expect(response.body.type).toBe(ApiErrorType.validation);
        expect(response.body.invalidParams).toEqual([
          { name: "title", reason: "The parameter cannot be empty" }
        ]);
      });

      it("should fail validation when introduction is empty", async () => {
        const response = await request(app).post(url).send({ ...payload, introduction: "" });
        expect(response.status).toBe(HTTPStatusCode.BAD_REQUEST);
        expect(response.body.type).toBe(ApiErrorType.validation);
        expect(response.body.invalidParams).toEqual([
          { name: "introduction", reason: "The parameter cannot be empty" }
        ]);
      });

      it("should fail validation when startTime is not ISO8601 format", async () => {
        const response = await request(app).post(url).send({ ...payload, startTime: "" });
        expect(response.status).toBe(HTTPStatusCode.BAD_REQUEST);
        expect(response.body.type).toBe(ApiErrorType.validation);
        expect(response.body.invalidParams).toEqual([
          { name: "startTime", reason: "Invalid parameter type" }
        ]);
      });

      it("should fail validation when endTime is not ISO8601 format", async () => {
        const response = await request(app).post(url).send({ ...payload, endTime: "" });
        expect(response.status).toBe(HTTPStatusCode.BAD_REQUEST);
        expect(response.body.type).toBe(ApiErrorType.validation);
        expect(response.body.invalidParams).toEqual([
          { name: "endTime", reason: "Invalid parameter type" }
        ]);
      });

      it("should fail validation when departmentIds is not array", async () => {
        const response = await request(app).post(url).send({ ...payload, departmentIds: "" });
        expect(response.status).toBe(HTTPStatusCode.BAD_REQUEST);
        expect(response.body.type).toBe(ApiErrorType.validation);
        expect(response.body.invalidParams).toEqual([
          { name: "departmentIds", reason: "The parameter must be Array" }
        ]);
      });

      it("should fail validation when departmentIds is empty array", async () => {
        const response = await request(app).post(url).send({ ...payload, departmentIds: [] });
        expect(response.status).toBe(HTTPStatusCode.BAD_REQUEST);
        expect(response.body.type).toBe(ApiErrorType.validation);
        expect(response.body.invalidParams).toEqual([
          { name: "departmentIds", reason: "The parameter cannot be empty" }
        ]);
      });

      it("should fail validation when element of departmentIds is not number", async () => {
        const response = await request(app).post(url).send({ ...payload, departmentIds: [ "1" ] });
        expect(response.status).toBe(HTTPStatusCode.BAD_REQUEST);
        expect(response.body.type).toBe(ApiErrorType.validation);
        expect(response.body.invalidParams).toEqual([
          { name: "departmentIds", reason: "Array element must be Number" }
        ]);
      });
    });
  });
});