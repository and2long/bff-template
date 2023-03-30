import { HospitalDTO, HospitalDTOMapper } from "../dtos/hospital-dto";
import Hospital from "../sequelize/entities/hospital";

class HospitalRepository {
  public async findAll(): Promise<HospitalDTO[]> {
    const items = await Hospital.findAll();
    return items.map((item: Hospital) => HospitalDTOMapper.mapToDTO(item));
  }
}

export default new HospitalRepository();
