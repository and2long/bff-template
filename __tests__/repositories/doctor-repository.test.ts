import doctorRepository from "../../src/repositoris/doctor-repository";
import { Gender } from "../../src/constants/gender";
import Doctor from "../../src/sequelize/entities/doctor";

describe("DoctorRepository", () => {
  const userId = "mock userId";
  const username = "mock username";
  const gender = Gender.FAMALE;
  const phoneNumber = "mock phoneNumber";
  const introduction = "mock introduction";
  const hospitalName = "mock hospitalName";
  const departmentName = "mock departmentName";
  const levelName = "mock levelName";
  const doctor = {
    user: {
      userId,
      username,
      gender,
      phoneNumber,
    },
    introduction,
    hospital: { name: hospitalName },
    department: { name: departmentName },
    level: { name: levelName },
  };
  const doctorDTO = {
    userId,
    username,
    gender,
    hospitalName,
    departmentName,
    levelName,
    phoneNumber,
    introduction,
  };

  test("should return all hospitals", async () => {
    jest.spyOn(Doctor, "findAll").mockResolvedValue([ doctor as any ]);
    const result = await doctorRepository.findAll();
    expect(result).toEqual([ doctorDTO ]);
  });
});