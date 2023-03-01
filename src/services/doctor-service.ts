import { DoctorInterface } from "../interfaces/user";
import doctorRepository from "../repositoris/doctor-repository";

const findAll = async (): Promise<DoctorInterface[]> => {
  return doctorRepository.findAll();
}

export const DoctorService = {
  findAll
}