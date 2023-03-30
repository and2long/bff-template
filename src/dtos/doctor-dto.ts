import { isNil, omitBy } from "lodash";
import Doctor from "../sequelize/entities/doctor";
import { DepartmentDTO, DepartmentDTOMapper } from "./department-dto";
import { DoctorLevelDTO, DoctorLevelDTOMapper } from "./doctor-level-dto";
import { DataTransferObjectMapper } from "./dto-mapper";
import { HospitalDTO, HospitalDTOMapper } from "./hospital-dto";

export interface DoctorDTO {
  userId: string;
  introduction?: string;
  hospital: HospitalDTO;
  department: DepartmentDTO;
  level: DoctorLevelDTO;
}


export const DoctorDTOMapper: DataTransferObjectMapper<DoctorDTO, Doctor> = {
  mapToDTO: (item: Doctor) => {
    const basic = {
      userId: item.userId,
      introduction: item.introduction,
      hospital: HospitalDTOMapper.mapToDTO(item.hospital),
      department: DepartmentDTOMapper.mapToDTO(item.department),
      level: DoctorLevelDTOMapper.mapToDTO(item.level),
    };
    return omitBy(basic, isNil) as unknown  as DoctorDTO;
  }
};
