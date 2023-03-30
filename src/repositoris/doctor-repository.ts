import { DoctorDTO, DoctorDTOMapper } from "../dtos/doctor-dto";
import Department from "../sequelize/entities/department";
import Doctor from "../sequelize/entities/doctor";
import DoctorLevel from "../sequelize/entities/doctor-level";
import Hospital from "../sequelize/entities/hospital";

class DoctorRepository {
  public async findAll(): Promise<DoctorDTO[]> {
    const items = await Doctor.findAll({ include: [Hospital, Department, DoctorLevel] });
    return items.map((item: Doctor) => DoctorDTOMapper.mapToDTO(item));
  }
}

export default new DoctorRepository();
