import { DepartmentInterface } from "../interfaces/department";
import departmentRepository from "../repositoris/department-repository";

const findAll = async (): Promise<DepartmentInterface[]> => {
  return departmentRepository.findAll();
}

export const DepartmentService = {
  findAll
}