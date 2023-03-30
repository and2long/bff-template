import { Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import Appointment from "./appointment";
import Department from "./department";

@Table
export default class AppointmentDepartment extends Model {
  @ForeignKey(() => Department)
  @Column
  departmentId!: number;

  @ForeignKey(() => Appointment)
  @Column
  appointmentId!: number;

  @UpdatedAt
  updatedAt!: Date;

  @CreatedAt
  createdAt!: Date;
}
