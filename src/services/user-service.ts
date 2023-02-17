import { UserInterface } from "../interfaces/user";
import userRepository from "../repositoris/user-repository";

const findAllUsers = async (): Promise<UserInterface[]> => {
  return userRepository.findAllUsers();
};

export const UserService = {
  findAllUsers
}