import Hospital from "../entities/hospital";
import { DataTransferObjectMapper } from "./dto-mapper";

export interface HospitalDTO {
  id: number;
  name: string;
  location?: string;
  latLong?: string;
  introduction?: string;
}


export const HospitalDTOMapper: DataTransferObjectMapper<HospitalDTO, Hospital> = {
  mapToDTO: (item: Hospital) => {
    const basic = {
      id: item.id,
      name: item.name,
      location: item.location,
      latLong: item.latLong,
      introduction: item.introduction,
    };
    return basic as HospitalDTO;
  }
};