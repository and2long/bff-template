import { TechnicalError } from "../errors/technical-error";
import { AppointmentCreationPayload } from "../interfaces/appointment";
import Appointment from "../sequelize/entities/appointment";
import { AppointmentDTO, AppointmentDTOMapper } from "../dtos/appointment-dto";
import User from "../sequelize/entities/user";
import Department from "../sequelize/entities/department";

class AppointmentRepository {
  public async findAll(): Promise<AppointmentDTO[]> {
    const items = await Appointment.findAll({ include: [User, Department] });
    return items.map((item: Appointment) => AppointmentDTOMapper.mapToDTO(item));
  }

  public async create(payload: AppointmentCreationPayload): Promise<number> {
    try {
      const { creatorId, title, introduction } = payload;
      const item = await Appointment.create({ creatorId, title, introduction });
      return item.id;
    } catch (e) {
      console.log("Failed to write appointment into DB due to error: ", e);
      throw new TechnicalError("Failed to create appointment");
    }
  }
}

export default new AppointmentRepository();
