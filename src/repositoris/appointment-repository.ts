import { AppointmentCreationPayload } from "../interfaces/appointment";
import Appointment from "../sequelize/entities/appointment";
import { AppointmentDTO, AppointmentDTOMapper } from "../dtos/appointment-dto";
import User from "../sequelize/entities/user";
import Department from "../sequelize/entities/department";
import AppointmentDepartment from "../sequelize/entities/appointment-department";
import AppointmentParticipant from "../sequelize/entities/appointment-participant";

class AppointmentRepository {
  public async findAll(): Promise<AppointmentDTO[]> {
    const items = await Appointment.findAll({
      include: [ User, Department, { model: AppointmentParticipant, include: [ User ] } ],
      order: [ [ "createdAt", "DESC" ] ]
    });
    return items.map((item: Appointment) => AppointmentDTOMapper.mapToDTO(item));
  }

  public async create(payload: AppointmentCreationPayload): Promise<Appointment> {
    const { creatorId, title, introduction, departmentIds, participantIds, startTime, endTime } = payload;
    const appointment = await Appointment.create({ creatorId, title, introduction, startTime, endTime });
    for (const id of departmentIds) {
      await AppointmentDepartment.create({ appointmentId: appointment.id, departmentId: id });
    }
    for (const id of participantIds) {
      await AppointmentParticipant.create({ appointmentId: appointment.id, participantId: id });
    }
    return appointment;
  }
}

export default new AppointmentRepository();
