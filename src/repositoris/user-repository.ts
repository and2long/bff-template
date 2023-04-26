import { UserDTO, UserDTOMapper } from "../dtos/user-dto";
import User from "../sequelize/entities/user";
import { UserCreationPayload } from "../interfaces/user";

class UserRepository {
  public async findAll(): Promise<UserDTO[]> {
    const items = await User.findAll();
    return items.map((item: User) => UserDTOMapper.mapToDTO(item));
  }

  public async createOrUpdateUser(payload: UserCreationPayload): Promise<string> {
    const { userId, username } = payload;
    const userExist = await User.findOne({ where: { userId } });
    if (userExist) {
      await User.update({ userId, username }, { where: { userId } });
      return userExist.userId;
    }
    const newUser = await User.create({ userId, username });
    return newUser.userId;
  }
}

export default new UserRepository();
