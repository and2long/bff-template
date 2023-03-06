import { Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { DoctorLevelInterface } from '../interfaces/doctor-level';
import Doctor from './doctor';

@Table({ tableName: "DoctorLevels" })
export default class DoctorLevel extends Model implements DoctorLevelInterface {

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({ allowNull: false })
  name!: string;

  @UpdatedAt
  updatedAt!: Date;

  @CreatedAt
  createdAt!: Date;

  @HasMany(() => Doctor)
  doctors!: Doctor[];
}