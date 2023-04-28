import { Gender } from "../../src/constants/gender";
import appointmentRepository from "../../src/repositoris/appointment-repository";
import { AppointmentDTO } from "../../src/dtos/appointment-dto";
import { AppointmentCreationPayload } from "../../src/interfaces/appointment";
import Appointment from "../../src/sequelize/entities/appointment";
import AppointmentDepartment from "../../src/sequelize/entities/appointment-department";
import AppointmentParticipant from "../../src/sequelize/entities/appointment-participant";
import User from "../../src/sequelize/entities/user";
import Department from "../../src/sequelize/entities/department";

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
  const appointmentParticipants = [ { participant: creator } ];
  const department = { id: 1, name: "外科" };
  const departmentIds = [ department.id ];
  const participantIds = [ userId ];
  const departmentNames = [ department.name ];
  const appointment = {
    creator,
    title,
    introduction,
    startTime,
    endTime,
    createdAt,
    participants: appointmentParticipants,
    departments: [ department ]
  };
  const appointmentDTO: AppointmentDTO = {
    creator,
    title,
    introduction,
    startTime,
    endTime,
    createdAt,
    departmentNames,
    participants: [ creator ],
  };

  test("should return all appointments", async () => {
    const findAllSpy = jest.spyOn(Appointment, "findAll").mockResolvedValue([ appointment as any ]);
    const result = await appointmentRepository.findAll();
    expect(findAllSpy).toHaveBeenCalledWith({
      include: [ User, Department, { model: AppointmentParticipant, include: [ User ] } ],
      order: [ [ "createdAt", "DESC" ] ]
    });
    expect(result).toEqual([ appointmentDTO ]);
  });

  describe("createAppointment", () => {
    const payload: AppointmentCreationPayload = {
      creatorId: userId,
      title, introduction, departmentIds, participantIds, startTime, endTime
    };
    let appointmentCreated: Appointment;
    let appointmentDepartments: AppointmentDepartment[];
    let appointmentParticipants: AppointmentParticipant[];

    afterEach(() => {
      Appointment.destroy({ where: { id: appointmentCreated.id } });
      for (const item of appointmentDepartments) {
        AppointmentDepartment.destroy({ where: { id: item.id } });
      }
      for (const item of appointmentParticipants) {
        AppointmentParticipant.destroy({ where: { id: item.id } });
      }
    });

    test("should create successfully with given data", async () => {
      appointmentCreated = await appointmentRepository.create(payload);
      appointmentDepartments = await AppointmentDepartment.findAll({ where: { appointmentId: appointmentCreated.id } });
      appointmentParticipants = await AppointmentParticipant.findAll({ where: { appointmentId: appointmentCreated.id } });
      const relatedDepartmentIds = appointmentDepartments.map((item: AppointmentDepartment) => item.departmentId);
      const relatedParticipantIds = appointmentParticipants.map((item: AppointmentParticipant) => item.participantId);
      expect(appointmentCreated).not.toBeNull();
      expect(appointmentCreated?.creatorId).toEqual(userId);
      expect(appointmentCreated?.title).toEqual(title);
      expect(appointmentCreated?.introduction).toEqual(introduction);
      expect(new Date(appointmentCreated?.startTime)).toEqual(new Date(startTime));
      expect(new Date(appointmentCreated?.endTime)).toEqual(new Date(endTime));
      expect(relatedDepartmentIds).toEqual(departmentIds);
      expect(relatedParticipantIds).toEqual(participantIds);
    });
  });
});