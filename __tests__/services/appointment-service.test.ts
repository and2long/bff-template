import appointmentRepository from "../../src/repositoris/appointment-repository";
import { AppointmentService } from "../../src/services/appointment-service";
import { AppointmentCreationPayload } from "../../src/interfaces/appointment";

describe("appointment-service", () => {
  const userId = "5e51c943-213e-4f1e-907b-1b076f784268";
  const title = "title";
  const introduction = "introduction";
  const startTime = "2023-04-07T17:00:00+08:00";
  const endTime = "2023-04-07T17:30:00+08:00";
  const department = { id: 1, name: "外科" };
  const departmentIds = [ department.id ];

  describe("findAll", () => {
    test("should call findAll of appointmentRepository", async () => {
      const findAllSpy = jest.spyOn(appointmentRepository, "findAll").mockResolvedValue([]);
      await AppointmentService.findAll();
      expect(findAllSpy).toHaveBeenCalled();
    });
  });

  describe("createAppointment", () => {
    const payload: AppointmentCreationPayload = {
      creatorId: userId,
      title, introduction, departmentIds, startTime, endTime
    };

    test("should call create of appointmentRepository", async () => {
      const createSpy = jest.spyOn(appointmentRepository, "create").mockResolvedValue({} as any);
      await AppointmentService.createAppointment(payload);
      expect(createSpy).toHaveBeenCalled();
    });
  });
});