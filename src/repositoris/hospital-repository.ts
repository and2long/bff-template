import Hospital from "../entities/hospital";
import { HospitalInterface } from "../interfaces/hospital";

class HospitalRepository {
  public async findAll(): Promise<HospitalInterface[]> {
    return Hospital.findAll();
  }
}

export default new HospitalRepository();
