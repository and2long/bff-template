import { isNil, omitBy } from "lodash";
import Department from "../sequelize/entities/department";
import { DataTransferObjectMapper } from "./dto-mapper";

export interface DepartmentDTO {
  id: number;
  name: string;
  introduction?: string;
}


export const DepartmentDTOMapper: DataTransferObjectMapper<DepartmentDTO, Department> = {
  mapToDTO: (item: Department) => {
    const basic = {
      id: item.id,
      name: item.name,
      introduction: item.introduction,
    };
    return omitBy(basic, isNil) as unknown  as DepartmentDTO;
  }
};
