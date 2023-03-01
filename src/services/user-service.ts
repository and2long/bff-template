import { CreateUser, UserInterface } from "../interfaces/user";
import userRepository from "../repositoris/user-repository";

const findAll = async (): Promise<UserInterface[]> => {
  return userRepository.findAll();
};

const createUser = async (user: CreateUser): Promise<[UserInterface, boolean]> => {
  return userRepository.createUser(user);
};

export const UserService = {
  findAll,
  createUser
}