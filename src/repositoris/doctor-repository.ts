import Department from "../entities/department";
import Doctor from "../entities/doctor";
import DoctorLevel from "../entities/doctor-level";
import Hospital from "../entities/hospital";
import { DoctorInterface } from "../interfaces/user";

class DoctorRepository {
  public async findAll(): Promise<DoctorInterface[]> {
    return Doctor.findAll({ include: [Hospital, Department, DoctorLevel] });
  }
}

export default new DoctorRepository();
