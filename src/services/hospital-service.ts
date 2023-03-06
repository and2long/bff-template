import { HospitalInterface } from "../interfaces/hospital";
import hospitalRepository from "../repositoris/hospital-repository";

const findAll = async (): Promise<HospitalInterface[]> => {
  return hospitalRepository.findAll();
}

export const HospitalService = {
  findAll
}