import hospitalRepository from "../../src/repositoris/hospital-repository";
import Hospital from "../../src/sequelize/entities/hospital";

describe("HospitalRepository", () => {
  const hospital = {
    id: 1,
    name: "mock name",
    location: "mock location",
    latLong: "mock latLong",
    introduction: "mock introduction",
  };

  test("should return all hospitals", async () => {
    jest.spyOn(Hospital, "findAll").mockResolvedValue([ hospital as any ]);
    const result = await hospitalRepository.findAll();
    expect(result).toEqual([ hospital ]);
  });
});