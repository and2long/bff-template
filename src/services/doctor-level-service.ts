import { DoctorLevelDTO } from "../dtos/doctor-level-dto";
import doctorLevelRepository from "../repositoris/doctor-level-repository";

const findAll = async (): Promise<DoctorLevelDTO[]> => {
  return doctorLevelRepository.findAll();
}

export const DoctorLevelService = {
  findAll
}