import request from "supertest";
import { app } from "../../src/app";
import { DepartmentService } from "../../src/services/department-service";
import { DepartmentDTO } from "../../src/dtos/department-dto";

describe("department-route", () => {
  const url = "/api/departments";
  const departmentDTO: DepartmentDTO = {
    id: 1, name: "外科", introduction: "mock introduction"
  };

  describe("GET / - get department list", () => {
    test("should get department list by call department service", async () => {
      const findAllSpy = jest.spyOn(DepartmentService, "findAll").mockResolvedValue([ departmentDTO ]);
      const response = await request(app).get(url);
      expect(findAllSpy).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([ departmentDTO ]);
    });
  });
});