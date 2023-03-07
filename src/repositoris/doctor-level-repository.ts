import { DoctorLevelDTO, DoctorLevelDTOMapper } from "../dtos/doctor-level-dto";
import DoctorLevel from "../entities/doctor-level";

class DoctorLevelRepository {
  public async findAll(): Promise<DoctorLevelDTO[]> {
    const items = await DoctorLevel.findAll();
    return items.map((item: DoctorLevel) => DoctorLevelDTOMapper.mapToDTO(item));
  }
}

export default new DoctorLevelRepository();
