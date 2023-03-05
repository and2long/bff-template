import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DepartmentInterface } from "../interfaces/department";

@Table
export default class Department extends Model implements DepartmentInterface {

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

}