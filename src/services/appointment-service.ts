import { AppointmentDTO } from "../dtos/appointment-dto";
import appointmentRepository from "../repositoris/appointment-repository";
import { AppointmentCreationPayload, AppointmentCreationResponse } from "../interfaces/appointment";

const findAll = async (): Promise<AppointmentDTO[]> => {
  return appointmentRepository.findAll();
};

const createAppointment = async (payload: AppointmentCreationPayload): Promise<AppointmentCreationResponse> => {
  const appointment = await appointmentRepository.create(payload);
  return { appointmentId: appointment.id };
};


export const AppointmentService = {
  findAll,
  createAppointment
};
