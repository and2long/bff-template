import { DoctorLevelInterface } from "../interfaces/doctor-level";
import doctorLevelRepository from "../repositoris/doctor-level-repository";

const findAll = async (): Promise<DoctorLevelInterface[]> => {
  return doctorLevelRepository.findAll();
}

export const DoctorLevelService = {
  findAll
}