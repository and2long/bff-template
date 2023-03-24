import { UserDTO, UserDTOMapper } from "../dtos/user-dto";
import User from "../entities/user";
import { UserCreationPayload } from "../interfaces/user";
import { TechnicalError } from "../errors/technical-error";

class UserRepository {
  public async findAll(): Promise<UserDTO[]> {
    const items = await User.findAll();
    return items.map((item: User) => UserDTOMapper.mapToDTO(item));
  }

  public async createOrUpdateUser(payload: UserCreationPayload): Promise<string> {
    try {
      const { userId, username } = payload;
      const userExist = await User.findOne({ where: { userId } });
      if (userExist) {
        await User.update({ userId, username }, { where: { userId } });
        return userExist.userId;
      }
      const newUser = await User.create({ userId, username });
      return newUser.userId;
    } catch (e) {
      console.log("Failed to write user into DB due to error: ", e);
      throw new TechnicalError("Failed to create/update user");
    }
  }

}

export default new UserRepository();
