import { isNil, omitBy } from "lodash";
import { DataTransferObjectMapper } from "./dto-mapper";
import Appointment from "../sequelize/entities/appointment";
import { UserDTO, UserDTOMapper } from "./user-dto";
import { DepartmentDTO, DepartmentDTOMapper } from "./department-dto";
import Department from "../sequelize/entities/department";

export interface AppointmentDTO {
  creator: UserDTO;
  title: string;
  introduction: string;
  participants: UserDTO[];
  departments: DepartmentDTO[];
}

export const AppointmentDTOMapper: DataTransferObjectMapper<AppointmentDTO, Appointment> = {
  mapToDTO: (item: Appointment) => {
    const basic = {
      creator: UserDTOMapper.mapToDTO(item.creator),
      title: item.title,
      introduction: item.introduction,
      // participants: item.participants.map((user: User) => UserDTOMapper.mapToDTO(user)),
      departments: item.departments.map((department: Department) => DepartmentDTOMapper.mapToDTO(department))
    };
    return omitBy(basic, isNil) as unknown as AppointmentDTO;
  }
};
