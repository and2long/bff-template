import envConfig from "../config/env-config";
import { HTTPStatusCode } from "../constants/http-response";
import { UserDTO, UserDTOMapper } from "../dtos/user-dto";
import User from "../entities/user";
import { keycloakApiClient } from "../http-client/http-client";
import { KeycloakUserCreationResponse, UserCreationPayload, UserCreationRequest } from "../interfaces/user";
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM } from "../utils/keycloak-setup";
import { TechnicalError } from "../errors/technical-error";
import { BusinessError } from "../errors/business-error";
import stringify from "fast-safe-stringify";

class UserRepository {
  public async findAll(): Promise<UserDTO[]> {
    const items = await User.findAll();
    return items.map((item: User) => UserDTOMapper.mapToDTO(item));
  }

  public async createUser(createUserPayload: UserCreationPayload): Promise<[ User, boolean ]> {
    return User.findOrCreate({ where: { userId: createUserPayload.userId }, defaults: { ...createUserPayload } },);
  }

  async getAccessToken(): Promise<string> {
    const {
      data,
      status
    } = await keycloakApiClient.post(`/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`, {
      "client_id": KEYCLOAK_CLIENT_ID,
      "client_secret": envConfig.keycloakClientSecret,
      "grant_type": "client_credentials",
    });
    if (status === HTTPStatusCode.OK) {
      return data.access_token;
    }
    throw new TechnicalError("Failed to retrieve access_token.");
  }

  public async createKeycloakUser(payload: UserCreationRequest): Promise<KeycloakUserCreationResponse> {
    const accessToken = await this.getAccessToken();
    const { status, headers, data } = await keycloakApiClient.post(`/admin/realms/${KEYCLOAK_REALM}/users`, {
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
    if (status === HTTPStatusCode.CREATED) {
      const location = headers.location;
      const userId = location.slice(location.lastIndexOf("/") + 1);
      return { userId };
    }
    console.log(`createKeycloakUser returned status code: ${status} and response: ${stringify(data)}`)
    if (status === HTTPStatusCode.CONFLICT) {
      throw new BusinessError("username already exists.", UserErrorCode.USERNAME_ALREADY_EXISTS);
    }
    throw new TechnicalError("Failed to create keycloak user.");
  }
}

export default new UserRepository();
