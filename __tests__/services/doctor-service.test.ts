import doctorRepository from "../../src/repositoris/doctor-repository";
import { DoctorService } from "../../src/services/doctor-service";

describe("doctor-service", () => {
  test("should call findAll of doctorRepository", async () => {
    const findAllSpy = jest.spyOn(doctorRepository, "findAll").mockResolvedValue([]);
    await DoctorService.findAll();
    expect(findAllSpy).toHaveBeenCalled();
  });
});