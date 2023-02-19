import { Department } from "./department";
import { DoctorTitle } from "./doctor-title";
import { Hospital } from "./hospital";

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
  avatar: string;
  phoneNumber?: string;
  introduction?: string;
}

export interface CreateUser extends Pick<UserInterface, "userId" | "username"> { };


export interface Doctor {
  userId: string;
  hospital: Hospital;
  department: Department;
  title: DoctorTitle;
  introduce?: string;
}