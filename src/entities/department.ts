import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { DepartmentInterface } from "../interfaces/department";

@Table({ tableName: "Departments" })
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
  
  @UpdatedAt
  updatedAt!: Date;

  @CreatedAt
  createdAt!: Date;
}