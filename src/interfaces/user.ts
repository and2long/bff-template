import { DepartmentInterface } from "./department";
import { DoctorLevelInterface } from "./doctor-level";
import { HospitalInterface } from "./hospital";

export enum Gender {
  MALE = "male",
  FAMALE = "female",
  UNKNOW = "unknown",
}


export interface UserInterface {
  userId: string;
  username: string;
  gender: Gender;
  createdAt: Date | string;
  updatedAt: Date | string;
  isDoctor: boolean;
  isPatient: boolean;
  isAssistant: boolean;
  avatar?: string;
  phoneNumber?: string;
  introduction?: string;
}

export interface CreateUser extends Pick<UserInterface, "userId" | "username"> { };


export interface DoctorInterface {
  userId: string;
  hospital: HospitalInterface;
  department: DepartmentInterface;
  level: DoctorLevelInterface;
  introduction?: string;
}