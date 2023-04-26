import request from "supertest";
import { app } from "../../src/app";
import { HospitalDTO } from "../../src/dtos/hospital-dto";
import { HospitalService } from "../../src/services/hospital-service";

describe("hospital-route", () => {
  const url = "/api/hospitals";
  const hospitalDTO: HospitalDTO = {
    id: 1, name: "mock name", location: "mock location", latLong: "mock latLong", introduction: "mock introduction"
  };

  describe("GET / - get hospital list", () => {
    test("should get hospital list by call hospital service", async () => {
      const findAllSpy = jest.spyOn(HospitalService, "findAll").mockResolvedValue([ hospitalDTO ]);
      const response = await request(app).get(url);
      expect(findAllSpy).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([ hospitalDTO ]);
    });
  });
});