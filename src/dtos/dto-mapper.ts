import { Model } from "sequelize";

export interface DataTransferObjectMapper<T, M extends Model> {
  mapToDTO: (model: M) => T;
}