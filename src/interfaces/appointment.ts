export interface AppointmentCreationPayload {
  creatorId: string,
  title: string,
  introduction: string,
  departmentIds: number[],
  startTime: string,
  endTime: string,
}
