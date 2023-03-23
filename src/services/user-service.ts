import { UserDTO } from "../dtos/user-dto";
import { KeycloakUserCreationResponse, UserCreationRequest } from "../interfaces/user";
import userRepository from "../repositoris/user-repository";
import { keycloakApiClient } from "../http-client/http-client";
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM } from "../utils/keycloak-setup";
import envConfig from "../config/env-config";
import { HTTPStatusCode } from "../constants/http-response";
import { TechnicalError } from "../errors/technical-error";
import stringify from "fast-safe-stringify";
import { BusinessError } from "../errors/business-error";
import { UserErrorCode } from "../constants/error-codes";

const findAll = async (): Promise<UserDTO[]> => {
  return userRepository.findAll();
};

const getAccessToken = async (): Promise<string> => {
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

const createKeycloakUser = async (payload: UserCreationRequest): Promise<KeycloakUserCreationResponse> => {
  const accessToken = await getAccessToken();
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
const createUser = async (payload: UserCreationRequest): Promise<KeycloakUserCreationResponse> => {
  // create a keycloak user.
  const response = await createKeycloakUser(payload);
  // create a qunai user.
  await userRepository.createUser({ userId: response.userId, username: payload.username });
  return response;
};

export const UserService = {
  findAll,
  createUser,
  getAccessToken,
  createKeycloakUser
}
