import { AppointmentDTO } from "../dtos/appointment-dto";
import appointmentRepository from "../repositoris/appointment-repository";
import { AppointmentCreationPayload } from "../interfaces/appointment";

const findAll = async (): Promise<AppointmentDTO[]> => {
  return appointmentRepository.findAll();
};

const createAppointment = async (payload: AppointmentCreationPayload): Promise<number> => {
  return appointmentRepository.create(payload);
};


export const AppointmentService = {
  findAll,
  createAppointment
};
