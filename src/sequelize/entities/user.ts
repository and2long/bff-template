import { BelongsToMany, Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Gender } from "../../constants/gender";
import Appointment from "./appointment";
import AppointmentUser from "./appointment-user";

@Table
export default class User extends Model {

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

  @HasMany(() => Appointment)
  appointmentsCreated!: Appointment[];

  @BelongsToMany(() => Appointment, () => AppointmentUser)
  appointmentsParticipated!: Appointment[];
}
