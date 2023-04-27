import doctorLevelRepository from "../../src/repositoris/doctor-level-repository";
import { DoctorLevelService } from "../../src/services/doctor-level-service";

describe("doctor-level-service", () => {
  test("should call findAll of doctorLevelRepository", async () => {
    const findAllSpy = jest.spyOn(doctorLevelRepository, "findAll").mockResolvedValue([]);
    await DoctorLevelService.findAll();
    expect(findAllSpy).toHaveBeenCalled();
  });
});