import { AxiosError } from "axios";
import envConfig from "../config/env-config";
import { HTTPStatusCode } from "../constants/http-response";
import { UserDTO, UserDTOMapper } from "../dtos/user-dto";
import User from "../entities/user";
import { keycloakApiClient } from "../http-client/http-client";
import { KeycloakUserCreationResponse, UserCreationPayload, UserCreationRequest } from "../interfaces/user";
import { KEYCLOAK_REALM, KEYCLOAK_CLIENT_ID } from "../utils/keycloak-setup";

class UserRepository {
  public async findAll(): Promise<UserDTO[]> {
    const items = await User.findAll();
    return items.map((item: User) => UserDTOMapper.mapToDTO(item));
  }

  public async createUser(createUserPayload: UserCreationPayload): Promise<[User, boolean]> {
    return User.findOrCreate({ where: { userId: createUserPayload.userId }, defaults: { ...createUserPayload } },);
  }

  public async createKeycloakUser(payload: UserCreationRequest): Promise<KeycloakUserCreationResponse> {
    try {
      const tokenResponse = await keycloakApiClient.post(`/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`, {
        "client_id": KEYCLOAK_CLIENT_ID,
        "client_secret": envConfig.keycloakClientSecret,
        "grant_type": "client_credentials",
      });
      const accessToken = tokenResponse.data.access_token;
      const response = await keycloakApiClient.post(`/admin/realms/${KEYCLOAK_REALM}/users`, {
        "enabled": true,
        "username": payload.username,
        "credentials": [
          {
            "type": "password",
            "value": payload.password,
            "temporary": false
          }
        ]
      }, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${accessToken}`
        }
      });
      const location = response.headers.location;
      const userId = location.slice(location.lastIndexOf("/") + 1);
      return { code: HTTPStatusCode.CREATED, userId };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return { code: error.response.status, ...error.response.data };
        }
      }
      return { code: HTTPStatusCode.INTERNAL_SERVER_ERROR, errorMessage: "Internal Error" };
    }
  }
}

export default new UserRepository();
