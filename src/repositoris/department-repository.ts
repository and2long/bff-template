import Department from "../entities/department";
import { DepartmentInterface } from "../interfaces/department";

class DepartmentRepository {
  public async findAll(): Promise<DepartmentInterface[]> {
    return Department.findAll({ limit: 10 });
  }
}

export default new DepartmentRepository();