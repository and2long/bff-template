import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Gender, UserInterface } from '../interfaces/user';

@Table({ tableName: "Users" })
class User extends Model implements UserInterface {

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

  @Column({ allowNull: false, defaultValue: false })
  isDoctor!: boolean;

  @Column({ allowNull: false, defaultValue: true })
  isPatient!: boolean;

  @Column({ allowNull: false, defaultValue: false })
  isAssistant!: boolean;

  @Column({ allowNull: true })
  avatar!: string;

  @Column({ allowNull: true })
  phoneNumber!: string;

  @Column({ allowNull: true })
  introduction!: string;

  @Column({ allowNull: false })
  username!: string;

  @Column({ allowNull: true })
  birthday!: Date;
}