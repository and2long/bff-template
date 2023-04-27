import hospitalRepository from "../../src/repositoris/hospital-repository";
import { HospitalService } from "../../src/services/hospital-service";

describe("hospital-service", () => {
  test("should call findAll of hospitalRepository", async () => {
    const findAllSpy = jest.spyOn(hospitalRepository, "findAll").mockResolvedValue([]);
    await HospitalService.findAll();
    expect(findAllSpy).toHaveBeenCalled();
  });
});