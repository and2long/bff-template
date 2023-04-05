export interface AppointmentCreationPayload {
  creatorId: number,
  title: string,
  introduction: string,
  departmentIds: number[],
  startTime: string,
  endTime: string,
}
