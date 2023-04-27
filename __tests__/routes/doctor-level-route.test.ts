import request from "supertest";
import { app } from "../../src/app";
import { DoctorLevelDTO } from "../../src/dtos/doctor-level-dto";
import { DoctorLevelService } from "../../src/services/doctor-level-service";

describe("doctor-level-route", () => {
  const url = "/api/doctor-levels";
  const doctorLevelDTO: DoctorLevelDTO = {
    id: 1, name: "主治医师"
  };

  describe("GET / - get doctor level list", () => {
    test("should get doctor level list by call doctor level service", async () => {
      const findAllSpy = jest.spyOn(DoctorLevelService, "findAll").mockResolvedValue([ doctorLevelDTO ]);
      const response = await request(app).get(url);
      expect(findAllSpy).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([ doctorLevelDTO ]);
    });
  });
});