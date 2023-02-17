import User from "../entities/user";
import { UserInterface } from "../interfaces/user";

class UserRepository {
  public async findAllUsers(): Promise<UserInterface[]> {
    return User.findAll();
  }
}

export default new UserRepository();
