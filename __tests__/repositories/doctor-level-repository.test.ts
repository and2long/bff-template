import doctorLevelRepository from "../../src/repositoris/doctor-level-repository";
import DoctorLevel from "../../src/sequelize/entities/doctor-level";

describe("DoctorLevelRepository", () => {
  const doctorLevel = {
    id: 1,
    name: "mock name",
  };

  test("should return all hospitals", async () => {
    jest.spyOn(DoctorLevel, "findAll").mockResolvedValue([ doctorLevel as any ]);
    const result = await doctorLevelRepository.findAll();
    expect(result).toEqual([ doctorLevel ]);
  });
});