import { HospitalDTO } from "../dtos/hospital-dto";
import hospitalRepository from "../repositoris/hospital-repository";

const findAll = async (): Promise<HospitalDTO[]> => {
  return hospitalRepository.findAll();
};

export const HospitalService = {
  findAll
};
