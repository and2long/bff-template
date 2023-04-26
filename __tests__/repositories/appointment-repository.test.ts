import { Gender } from "../../src/constants/gender";
import appointmentRepository from "../../src/repositoris/appointment-repository";
import { AppointmentDTO } from "../../src/dtos/appointment-dto";
import { AppointmentCreationPayload } from "../../src/interfaces/appointment";
import Appointment from "../../src/sequelize/entities/appointment";
import AppointmentDepartment from "../../src/sequelize/entities/appointment-department";

describe("AppointmentRepository", () => {
  const userId = "5e51c943-213e-4f1e-907b-1b076f784268";
  const username = "zhangSan";
  const gender = Gender.MALE;
  const creator = { userId, username, gender };
  const title = "title";
  const introduction = "introduction";
  const startTime = "2023-04-07T17:00:00+08:00";
  const endTime = "2023-04-07T17:30:00+08:00";
  const createdAt = "2023-04-07T17:00:00+08:00";
  const participants = [ creator ];
  const departmentIds = [ 1 ];
  const departmentNames = [ "外科" ];
  const appointmentDTO: AppointmentDTO = {
    creator,
    title,
    introduction,
    startTime,
    endTime,
    createdAt,
    departmentNames,
    participants
  };

  test("should return all appointments", async () => {
    jest.spyOn(appointmentRepository, "findAll").mockResolvedValue([ appointmentDTO ]);
    const result = await appointmentRepository.findAll();
    expect(result).toEqual([ appointmentDTO ]);
  });

  describe("createAppointment", () => {
    const payload: AppointmentCreationPayload = {
      creatorId: userId,
      title, introduction, departmentIds, startTime, endTime
    };
    let appointmentCreated: Appointment;
    let appointmentDepartments: AppointmentDepartment[];

    afterEach(() => {
      Appointment.destroy({ where: { id: appointmentCreated.id } });
      for (const item of appointmentDepartments) {
        AppointmentDepartment.destroy({ where: { id: item.id } });
      }
    });

    test("should create successfully with given data", async () => {
      appointmentCreated = await appointmentRepository.create(payload);
      appointmentDepartments = await AppointmentDepartment.findAll({ where: { appointmentId: appointmentCreated.id } });
      const relatedDepartmentIds = appointmentDepartments.map((item: AppointmentDepartment) => item.departmentId);
      expect(appointmentCreated).not.toBeNull();
      expect(appointmentCreated?.creatorId).toEqual(userId);
      expect(appointmentCreated?.title).toEqual(title);
      expect(appointmentCreated?.introduction).toEqual(introduction);
      expect(new Date(appointmentCreated?.startTime)).toEqual(new Date(startTime));
      expect(new Date(appointmentCreated?.endTime)).toEqual(new Date(endTime));
      expect(relatedDepartmentIds).toEqual(departmentIds);
    });
  });
});