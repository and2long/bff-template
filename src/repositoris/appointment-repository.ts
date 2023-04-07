import { TechnicalError } from "../errors/technical-error";
import { AppointmentCreationPayload, AppointmentCreationResponse } from "../interfaces/appointment";
import Appointment from "../sequelize/entities/appointment";
import { AppointmentDTO, AppointmentDTOMapper } from "../dtos/appointment-dto";
import User from "../sequelize/entities/user";
import Department from "../sequelize/entities/department";
import AppointmentDepartment from "../sequelize/entities/appointment-department";
import { sequelize } from "../utils/db-setup";

class AppointmentRepository {
  public async findAll(): Promise<AppointmentDTO[]> {
    const items = await Appointment.findAll({
      include: [ User, Department ],
      order: [ [ "createdAt", "DESC" ] ]
    });
    return items.map((item: Appointment) => AppointmentDTOMapper.mapToDTO(item));
  }

  public async create(payload: AppointmentCreationPayload): Promise<AppointmentCreationResponse> {
    try {
      const { creatorId, title, introduction, departmentIds, startTime, endTime } = payload;
      return sequelize.transaction(async transaction => {
        const item = await Appointment.create(
          { creatorId, title, introduction, startTime, endTime },
          { transaction }
        );
        for (let i = 0; i < departmentIds.length; i++) {
          await AppointmentDepartment.create(
            { appointmentId: item.id, departmentId: departmentIds[i] },
            { transaction }
          );
        }
        return { appointmentId: item.id };
      });
    } catch (e) {
      console.log("Failed to write appointment into DB due to error: ", e);
      throw new TechnicalError("Failed to create appointment");
    }
  }
}

export default new AppointmentRepository();
