import departmentRepository from "../../src/repositoris/department-repository";
import Department from "../../src/sequelize/entities/department";

describe("DepartmentRepository", () => {
  const department = {
    id: 1,
    name: "mock name",
    introduction: "mock introduction",
  };

  test("should return all hospitals", async () => {
    const findAllSpy = jest.spyOn(Department, "findAll").mockResolvedValue([ department as any ]);
    const result = await departmentRepository.findAll();
    expect(findAllSpy).toHaveBeenCalled();
    expect(result).toEqual([ department ]);
  });
});