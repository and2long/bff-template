export interface AppointmentCreationPayload {
  creatorId: string,
  title: string,
  introduction: string,
  departmentIds: number[],
  participantIds: string[],
  startTime: string,
  endTime: string,
}

export interface AppointmentCreationResponse {
  appointmentId: number;
}