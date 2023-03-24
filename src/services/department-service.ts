import { DepartmentDTO } from "../dtos/department-dto";
import departmentRepository from "../repositoris/department-repository";

const findAll = async (): Promise<DepartmentDTO[]> => {
  return departmentRepository.findAll();
};

export const DepartmentService = {
  findAll
};