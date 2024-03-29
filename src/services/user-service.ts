import { UserDTO } from "../dtos/user-dto";
import { UserCreationRequest, UserCreationResponse } from "../interfaces/user";
import userRepository from "../repositoris/user-repository";
import { keycloakApiClient } from "../http-client/http-client";
import envConfig from "../config/env-config";
import { UserErrorCode } from "../constants/error-codes";
import { AxiosError } from "axios";
import { HTTPStatusCode, TechnicalError, BusinessError } from "@and2long/lib-commons";

const findAll = async (): Promise<UserDTO[]> => {
  return userRepository.findAll();
};

const getAccessToken = async (): Promise<string> => {
  try {
    const params = {
      "client_id": envConfig.keycloakClientId,
      "client_secret": envConfig.keycloakClientSecret,
      "grant_type": "client_credentials",
    };
    const {
      data,
      status
    } = await keycloakApiClient.post(`/realms/${envConfig.keycloakRealm}/protocol/openid-connect/token`, params);
    if (status === HTTPStatusCode.OK) {
      return data.access_token;
    }
  } catch (e) {
    const error = e as unknown as AxiosError;
    if (error.response?.status === HTTPStatusCode.UNAUTHORIZED) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new TechnicalError(JSON.stringify({
        "code": error.response?.status,
        "data": error.response?.data
      }));
    }
  }
  throw new TechnicalError("Failed to retrieve access_token.");
};

const createKeycloakUser = async (payload: UserCreationRequest): Promise<UserCreationResponse> => {
  const accessToken = await getAccessToken();
  try {
    const { headers } = await keycloakApiClient.post(`/admin/realms/${envConfig.keycloakRealm}/users`, {
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
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    });
    const location = headers.location;
    const userId = location.slice(location.lastIndexOf("/") + 1);
    return { userId };
  } catch (e) {
    const error = e as unknown as AxiosError;
    if (error.response?.status === HTTPStatusCode.CONFLICT) {
      throw new BusinessError("User exists with same username", UserErrorCode.USERNAME_ALREADY_EXISTS);
    }
    if (error.response?.status === HTTPStatusCode.FORBIDDEN) {
      throw new TechnicalError(JSON.stringify({
        "code": error.response?.status,
        "data": error.response?.data
      }));
    }
    throw new TechnicalError("Failed to create keycloak user");
  }
};

const createUser = async (payload: UserCreationRequest): Promise<UserCreationResponse> => {
  // create a keycloak user.
  const response = await createKeycloakUser(payload);
  // create a business user.
  await userRepository.createOrUpdateUser({ userId: response.userId, username: payload.username });
  return response;
};

export const UserService = {
  findAll,
  createUser,
  getAccessToken,
  createKeycloakUser
};
