import DoctorLevel from "../entities/doctor-level";
import { DataTransferObjectMapper } from "./dto-mapper";

export interface DoctorLevelDTO {
  id: number;
  name: string;
}

export const DoctorLevelDTOMapper: DataTransferObjectMapper<DoctorLevelDTO, DoctorLevel> = {
  mapToDTO: (item: DoctorLevel) => {
    const basic = {
      id: item.id,
      name: item.name,
    };
    return basic as DoctorLevelDTO;
  }
};