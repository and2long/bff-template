import User from "../entities/user";
import { CreateUser, UserInterface } from "../interfaces/user";

class UserRepository {
  public async findAll(): Promise<UserInterface[]> {
    return User.findAll();
  }

  public async createUser(user: CreateUser): Promise<[UserInterface, boolean]> {
    return User.findOrCreate({ where: { userId: user.userId }, defaults: user },);
  }
}

export default new UserRepository();
