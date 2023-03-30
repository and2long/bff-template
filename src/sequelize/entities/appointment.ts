import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt
} from "sequelize-typescript";
import User from "./user";
import AppointmentUser from "./appointment-user";
import Department from "./department";
import AppointmentDepartment from "./appointment-department";

@Table
export default class Appointment extends Model {

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.UUID,
  })
  creatorId!: string;

  @BelongsTo(() => User)
  creator!: User;

  @Column({ allowNull: false })
  title!: string;

  @Column({ allowNull: false })
  introduction?: string;

  @UpdatedAt
  updatedAt!: Date;

  @CreatedAt
  createdAt!: Date;

  @BelongsToMany(() => User, () => AppointmentUser)
  participants!: User[];

  @BelongsToMany(() => Department, () => AppointmentDepartment)
  departments!: Department[];
}
