import { isNil, omitBy } from "lodash";
import Appointment from "../sequelize/entities/appointment";
import Department from "../sequelize/entities/department";
import { DataTransferObjectMapper } from "./dto-mapper";
import { UserDTO, UserDTOMapper } from "./user-dto";
import AppointmentParticipant from "../sequelize/entities/appointment-participant";

export interface AppointmentDTO {
  creator: UserDTO;
  title: string;
  introduction: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  participants: UserDTO[];
  departmentNames: string[];
}

export const AppointmentDTOMapper: DataTransferObjectMapper<AppointmentDTO, Appointment> = {
  mapToDTO: (item: Appointment) => {
    const basic = {
      creator: UserDTOMapper.mapToDTO(item.creator),
      title: item.title,
      introduction: item.introduction,
      startTime: item.startTime,
      endTime: item.endTime,
      createdAt: item.createdAt,
      participants:
        item.participants.map((participant: AppointmentParticipant) => UserDTOMapper.mapToDTO(participant.participant)),
      departmentNames: item.departments.map((department: Department) => department.name)
    };
    return omitBy(basic, isNil) as unknown as AppointmentDTO;
  }
};
