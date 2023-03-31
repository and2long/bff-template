import { Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import User from "./user";
import Appointment from "./appointment";

@Table
export default class AppointmentUser extends Model {
  @ForeignKey(() => User)
  @Column
  userId!: string;

  @ForeignKey(() => Appointment)
  @Column
  appointmentId!: number;

  @UpdatedAt
  updatedAt!: Date;

  @CreatedAt
  createdAt!: Date;
}
