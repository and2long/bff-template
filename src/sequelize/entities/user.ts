import { Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Gender } from "../../constants/gender";
import Appointment from "./appointment";
import AppointmentParticipant from "./appointment-participant";

@Table
export default class User extends Model {

  @Column({
    allowNull: false,
    type: DataType.UUID,
    unique: true,
    primaryKey: true
  })
  userId!: string;

  @Column({ allowNull: false })
  username!: string;

  @Column({
    allowNull: false,
    defaultValue: Gender.UNKNOW,
    type: DataType.ENUM<Gender>(
      Gender.MALE,
      Gender.FAMALE,
      Gender.UNKNOW,
    ),
  })
  gender!: Gender;

  @Column
  phoneNumber?: string;

  @Column
  introduction?: string;

  @Column
  birthday?: Date;

  @UpdatedAt
  updatedAt!: Date;

  @CreatedAt
  createdAt!: Date;

  @HasMany(() => Appointment, "creatorId")
  createdAppointments!: Appointment[];

  @HasMany(() => AppointmentParticipant, "participantId")
  participatedAppointments!: AppointmentParticipant[];
}
