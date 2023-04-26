import request from "supertest";
import { app } from "../../src/app";
import { DoctorDTO } from "../../src/dtos/doctor-dto";
import { Gender } from "../../src/constants/gender";
import { DoctorService } from "../../src/services/doctor-service";

describe("doctor-route", () => {
  const url = "/api/doctors";
  const doctorDTO: DoctorDTO = {
    userId: "mock userId",
    username: "username",
    gender: Gender.FAMALE,
    phoneNumber: "mock phone number",
    introduction: "mock introduction",
    hospitalName: " mock hospital name",
    departmentName: " mock department name",
    levelName: " mock level name",
  };

  describe("GET / - get doctor list", () => {
    test("should get doctor list by call doctor service", async () => {
      const findAllSpy = jest.spyOn(DoctorService, "findAll").mockResolvedValue([ doctorDTO ]);
      const response = await request(app).get(url);
      expect(findAllSpy).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([ doctorDTO ]);
    });
  });
});