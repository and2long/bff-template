import { isNil, omitBy } from "lodash";
import { Gender } from "../constants/gender";
import Doctor from "../sequelize/entities/doctor";
import { DataTransferObjectMapper } from "./dto-mapper";

export interface DoctorDTO {
  userId: string,
  username: string,
  gender: Gender,
  hospitalName: string;
  departmentName: string;
  levelName: string;
  phoneNumber?: string;
  introduction?: string;
}


export const DoctorDTOMapper: DataTransferObjectMapper<DoctorDTO, Doctor> = {
  mapToDTO: (item: Doctor) => {
    const basic = {
      userId: item.user.userId,
      username: item.user.username,
      gender: item.user.gender,
      phoneNumber: item.user.phoneNumber,
      introduction: item.introduction,
      hospitalName: item.hospital.name,
      departmentName: item.department.name,
      levelName: item.level.name,
    };
    return omitBy(basic, isNil) as unknown as DoctorDTO;
  }
};
