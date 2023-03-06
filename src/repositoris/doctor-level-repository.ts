import DoctorLevel from "../entities/doctor-level";
import { DoctorLevelInterface } from "../interfaces/doctor-level";

class DoctorLevelRepository {
  public async findAll(): Promise<DoctorLevelInterface[]> {
    return DoctorLevel.findAll();
  }
}

export default new DoctorLevelRepository();
