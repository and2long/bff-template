import { CreateUser, UserInterface } from "../interfaces/user";
import userRepository from "../repositoris/user-repository";

const findAllUsers = async (): Promise<UserInterface[]> => {
  return userRepository.findAllUsers();
};

const createUser = async (user: CreateUser): Promise<[UserInterface, boolean]> => {
  return userRepository.createUser(user);
};

export const UserService = {
  findAllUsers,
  createUser
}