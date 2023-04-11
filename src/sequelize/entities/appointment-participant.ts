import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import User from "./user";
import Appointment from "./appointment";

@Table
export default class AppointmentParticipant extends Model {
  @ForeignKey(() => User)
  @Column
  participantId!: string;

  @ForeignKey(() => Appointment)
  @Column
  appointmentId!: number;

  @BelongsTo(() => Appointment, "appointmentId")
  appointment!: Appointment;

  @BelongsTo(() => User, "participantId")
  participant!: User;

  @UpdatedAt
  updatedAt!: Date;

  @CreatedAt
  createdAt!: Date;
}
