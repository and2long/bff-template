import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { HospitalInterface } from "../interfaces/hospital";

@Table
export default class Hospital extends Model implements HospitalInterface {

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({ allowNull: false })
  name!: string;

  @Column
  location?: string;

  @Column
  latLong?: string;
  
  @Column
  introduction?: string;

}