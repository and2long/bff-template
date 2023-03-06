import { Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { HospitalInterface } from "../interfaces/hospital";
import Doctor from './doctor';

@Table({ tableName: "Hospitals" })
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

  @UpdatedAt
  updatedAt!: Date;

  @CreatedAt
  createdAt!: Date;

  @HasMany(() => Doctor)
  doctors!: Doctor[];
}