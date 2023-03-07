import { DepartmentDTO, DepartmentDTOMapper } from "../dtos/department-dto";
import Department from "../entities/department";

class DepartmentRepository {
  public async findAll(): Promise<DepartmentDTO[]> {
    const items = await Department.findAll();
    return items.map((item: Department) => DepartmentDTOMapper.mapToDTO(item));
  }
}

export default new DepartmentRepository();