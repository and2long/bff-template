import { UserDTO } from "../dtos/user-dto";
import User from "../entities/user";
import { CreateUser } from "../interfaces/user";
import userRepository from "../repositoris/user-repository";

const findAll = async (): Promise<UserDTO[]> => {
  return userRepository.findAll();
};

const createUser = async (user: CreateUser): Promise<[User, boolean]> => {
  return userRepository.createUser(user);
};

export const UserService = {
  findAll,
  createUser
}