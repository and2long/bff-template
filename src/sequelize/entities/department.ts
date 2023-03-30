import { BelongsToMany, Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
import Doctor from "./doctor";
import Appointment from "./appointment";
import AppointmentDepartment from "./appointment-department";

@Table
export default class Department extends Model {

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
  introduction?: string;

  @UpdatedAt
  updatedAt!: Date;

  @CreatedAt
  createdAt!: Date;

  @HasMany(() => Doctor)
  doctors!: Doctor[];

  @BelongsToMany(() => Appointment, () => AppointmentDepartment)
  appointments!: Appointment[];
}
