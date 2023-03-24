import { Gender } from "../constants/gender";
import User from "../entities/user";
import { DataTransferObjectMapper } from "./dto-mapper";


export interface UserDTO {
  userId: string;
  username: string;
  gender: Gender;
  phoneNumber?: string;
  introduction?: string;
}

export const UserDTOMapper: DataTransferObjectMapper<UserDTO, User> = {
  mapToDTO: (item: User) => {
    const basic = {
      userId: item.userId,
      username: item.username,
      gender: item.gender,
      phoneNumber: item.phoneNumber,
      introduction: item.introduction,
    };
    return basic as UserDTO;
  }
};