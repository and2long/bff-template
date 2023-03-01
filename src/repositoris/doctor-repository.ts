import Doctor from "../entities/doctor";
import { DoctorInterface } from "../interfaces/user";

class DoctorRepository {
  public async findAll(): Promise<DoctorInterface[]> {
    return Doctor.findAll();
  }
}

export default new DoctorRepository();
