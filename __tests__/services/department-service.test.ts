import departmentRepository from "../../src/repositoris/department-repository";
import { DepartmentService } from "../../src/services/department-service";

describe("department-service", () => {
  test("should call findAll of departmentRepository", async () => {
    const findAllSpy = jest.spyOn(departmentRepository, "findAll").mockResolvedValue([]);
    await DepartmentService.findAll();
    expect(findAllSpy).toHaveBeenCalled();
  });
});