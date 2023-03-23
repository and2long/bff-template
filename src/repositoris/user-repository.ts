import { UserDTO, UserDTOMapper } from "../dtos/user-dto";
import User from "../entities/user";
import { UserCreationPayload } from "../interfaces/user";

class UserRepository {
  public async findAll(): Promise<UserDTO[]> {
    const items = await User.findAll();
    return items.map((item: User) => UserDTOMapper.mapToDTO(item));
  }

  public async createUser(createUserPayload: UserCreationPayload): Promise<[ User, boolean ]> {
    return User.findOrCreate({ where: { userId: createUserPayload.userId }, defaults: { ...createUserPayload } },);
  }

}

export default new UserRepository();
