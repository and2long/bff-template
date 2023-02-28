import { BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { DoctorInterface } from '../interfaces/user';
import Department from './department';
import DoctorLevel from './doctor-level';
import Hospital from './hospital';

@Table
export default class Doctor extends Model implements DoctorInterface {

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    allowNull: false,
    type: DataType.UUID,
    unique: true
  })
  userId!: string;

  @Column
  introduction?: string;

  @UpdatedAt
  updatedAt!: Date;

  @CreatedAt
  createdAt!: Date;

  @BelongsTo(() => Hospital)
  hospital!: Hospital;

  @BelongsTo(() => Department)
  department!: Department;

  @BelongsTo(() => DoctorLevel)
  level!: DoctorLevel;

}
