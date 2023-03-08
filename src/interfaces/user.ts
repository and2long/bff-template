import { UserDTO } from "../dtos/user-dto";

export interface CreateUser extends Pick<UserDTO, "userId" | "username"> { };
