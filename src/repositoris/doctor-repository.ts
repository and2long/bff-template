import { DoctorDTO, DoctorDTOMapper } from "../dtos/doctor-dto";
import Department from "../entities/department";
import Doctor from "../entities/doctor";
import DoctorLevel from "../entities/doctor-level";
import Hospital from "../entities/hospital";

class DoctorRepository {
  public async findAll(): Promise<DoctorDTO[]> {
    const items = await Doctor.findAll({ include: [Hospital, Department, DoctorLevel] });
    return items.map((item: Doctor) => DoctorDTOMapper.mapToDTO(item));
  }
}

export default new DoctorRepository();
