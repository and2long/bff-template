import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DoctorLevelInterface } from '../interfaces/doctor-level';

@Table
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

}