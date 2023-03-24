import { DoctorDTO } from "../dtos/doctor-dto";
import doctorRepository from "../repositoris/doctor-repository";

const findAll = async (): Promise<DoctorDTO[]> => {
  return doctorRepository.findAll();
};

export const DoctorService = {
  findAll
};