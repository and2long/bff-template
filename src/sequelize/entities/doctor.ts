import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import Department from "./department";
import DoctorLevel from "./doctor-level";
import Hospital from "./hospital";

@Table
export default class Doctor extends Model {

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

  @ForeignKey(() => Hospital)
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  hospitalId!: number;

  @BelongsTo(() => Hospital)
  hospital!: Hospital;

  @ForeignKey(() => Department)
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  departmentId!: number;

  @BelongsTo(() => Department)
  department!: Department;

  @ForeignKey(() => DoctorLevel)
  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  levelId!: number;

  @BelongsTo(() => DoctorLevel)
  level!: DoctorLevel;

  @UpdatedAt
  updatedAt!: Date;

  @CreatedAt
  createdAt!: Date;
}
