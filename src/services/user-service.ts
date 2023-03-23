import { UserDTO } from "../dtos/user-dto";
import { KeycloakUserCreationResponse, UserCreationRequest } from "../interfaces/user";
import userRepository from "../repositoris/user-repository";

const findAll = async (): Promise<UserDTO[]> => {
  return userRepository.findAll();
};

const createUser = async (payload: UserCreationRequest): Promise<KeycloakUserCreationResponse> => {
  // create a keycloak user.
  const response = await userRepository.createKeycloakUser(payload);
  // create a qunai user.
  await userRepository.createUser({ userId: response.userId, username: payload.username });
  return response;
};

export const UserService = {
  findAll,
  createUser
}
