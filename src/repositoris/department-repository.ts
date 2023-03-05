import Department from "../entities/department";
import { DepartmentInterface } from "../interfaces/department";

class DepartmentRepository {
  public async findAll(): Promise<DepartmentInterface[]> {
    return Department.findAll();
  }
}

export default new DepartmentRepository();