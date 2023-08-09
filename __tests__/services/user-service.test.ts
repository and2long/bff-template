import { BusinessError, HTTPStatusCode, TechnicalError } from "@and2long/lib-commons";
import { AxiosError, AxiosResponse } from "axios";
import envConfig from "../../src/config/env-config";
import { UserErrorCode } from "../../src/constants/error-codes";
import { keycloakApiClient } from "../../src/http-client/http-client";
import { UserCreationRequest } from "../../src/interfaces/user";
import userRepository from "../../src/repositoris/user-repository";
import { UserService } from "../../src/services/user-service";

describe("UserService", () => {
  const accessTokenMock = "mock access token";
  const userIdMock = "mock user id";
  const clientSecret = envConfig.keycloakClientSecret;
  const payload: UserCreationRequest = {
    username: "zhangSan",
    password: "password"
  };

  describe("findAll", () => {
    test("should call findAll of userRepository", async () => {
      const findAllSpy = jest.spyOn(userRepository, "findAll");
      await UserService.findAll();
      expect(findAllSpy).toHaveBeenCalled();
    });
  });

  describe("getAccessToken", () => {
    test("should return access token when request success", async () => {
      const getAccessTokenSpy = jest.spyOn(keycloakApiClient, "post").mockResolvedValue({
        status: HTTPStatusCode.OK,
        data: {
          "access_token": accessTokenMock
        }
      });
      const result = await UserService.getAccessToken();
      expect(getAccessTokenSpy).toHaveBeenCalledWith(
        `/realms/${envConfig.keycloakRealm}/protocol/openid-connect/token`,
        {
          "client_id": "qunai-medical",
          "client_secret": clientSecret,
          "grant_type": "client_credentials"
        });
      expect(result).toEqual(accessTokenMock);
    });

    test("should throw error for non-200 status codes", async () => {
      const getAccessTokenSpy = jest.spyOn(keycloakApiClient, "post").mockResolvedValue({
        status: HTTPStatusCode.BAD_REQUEST,
        data: {
          "error": "unsupported_grant_type",
          "error_description": "Unsupported grant_type"
        }
      });
      await expect(UserService.getAccessToken()).rejects.toThrow(
        new TechnicalError("Failed to retrieve access_token.")
      );
      expect(getAccessTokenSpy).toHaveBeenCalledWith(
        `/realms/${envConfig.keycloakRealm}/protocol/openid-connect/token`,
        {
          "client_id": "qunai-medical",
          "client_secret": clientSecret,
          "grant_type": "client_credentials"
        });
    });
  });

  describe("createKeycloakUser", () => {
    const createKeycloakUserSpy = jest.spyOn(UserService, "createKeycloakUser");

    describe("with getAccessToken failure", () => {
      test("should throw error when getAccessToken throw tech error", async () => {
        jest.spyOn(keycloakApiClient, "post").mockResolvedValue({
          status: HTTPStatusCode.BAD_REQUEST,
          data: {
            "error": "unsupported_grant_type",
            "error_description": "Unsupported grant_type"
          }
        });
        await expect(UserService.createKeycloakUser(payload)).rejects.toThrow(
          new TechnicalError("Failed to retrieve access_token.")
        );
        expect(createKeycloakUserSpy).toHaveBeenCalledWith(payload);
      });
    });

    describe("with getAccessToken success", () => {

      test("should return userId when create keycloak user success", async () => {
        const apiClientSpy = jest.spyOn(keycloakApiClient, "post")
          .mockResolvedValueOnce(
            {
              status: HTTPStatusCode.OK,
              data: {
                "access_token": accessTokenMock
              }
            }
          )
          .mockResolvedValueOnce({
            status: HTTPStatusCode.CREATED,
            headers: {
              "location": `http://keycloak_address/auth/admin/realms/realm/users/${userIdMock}`
            }
          });
        const result = await UserService.createKeycloakUser(payload);
        expect(apiClientSpy).toHaveBeenCalledTimes(2);
        expect(apiClientSpy).toHaveBeenLastCalledWith("/admin/realms/qunai/users", {
          "credentials": [{
            "temporary": false,
            "type": "password",
            "value": "password"
          }], "enabled": true, "username": "zhangSan"
        }, { "headers": { "Authorization": "Bearer mock access token", "Content-Type": "application/json" } });
        expect(createKeycloakUserSpy).toHaveBeenCalledWith(payload);
        expect(result).toEqual({ userId: userIdMock });
      });

      test("should throw business error when username is exists", async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response: AxiosResponse = {
          data: { errorMessage: "User exists with same username" },
          status: 409,
        };
        const apiClientSpy = jest.spyOn(keycloakApiClient, "post")
          .mockResolvedValueOnce({
            status: HTTPStatusCode.OK,
            data: {
              "access_token": accessTokenMock
            }
          })
          .mockRejectedValueOnce(
            new AxiosError(undefined, undefined, undefined, undefined, response)
          );
        await expect(UserService.createKeycloakUser(payload)).rejects.toThrow(
          new BusinessError("User exists with same username", UserErrorCode.USERNAME_ALREADY_EXISTS)
        );
        expect(apiClientSpy).toHaveBeenCalledTimes(2);
        expect(apiClientSpy).toHaveBeenLastCalledWith("/admin/realms/qunai/users", {
          "credentials": [{
            "temporary": false,
            "type": "password",
            "value": "password"
          }], "enabled": true, "username": "zhangSan"
        }, { "headers": { "Authorization": "Bearer mock access token", "Content-Type": "application/json" } });
        expect(createKeycloakUserSpy).toHaveBeenCalledWith(payload);
      });

      test("should throw tech error when access_token expired", async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response: AxiosResponse = {
          data: { error: "HTTP 401 Unauthorized" },
          status: 401,
        };
        const apiClientSpy = jest.spyOn(keycloakApiClient, "post")
          .mockResolvedValueOnce({
            status: HTTPStatusCode.OK,
            data: {
              "access_token": accessTokenMock
            }
          })
          .mockRejectedValueOnce(
            new AxiosError(undefined, undefined, undefined, undefined, response)
          );
        await expect(UserService.createKeycloakUser(payload)).rejects.toThrow(
          new TechnicalError("Failed to create keycloak user")
        );
        expect(apiClientSpy).toHaveBeenCalledTimes(2);
        expect(apiClientSpy).toHaveBeenLastCalledWith("/admin/realms/qunai/users", {
          "credentials": [{
            "temporary": false,
            "type": "password",
            "value": "password"
          }], "enabled": true, "username": "zhangSan"
        }, { "headers": { "Authorization": "Bearer mock access token", "Content-Type": "application/json" } });
        expect(createKeycloakUserSpy).toHaveBeenCalledWith(payload);
      });
    });
  });

  describe("createUser", () => {
    test("should invoke createKeycloakUser and createOrUpdateUser", async () => {
      const apiClientSpy = jest.spyOn(keycloakApiClient, "post")
        .mockResolvedValueOnce(
          {
            status: HTTPStatusCode.OK,
            data: {
              "access_token": accessTokenMock
            }
          }
        )
        .mockResolvedValueOnce({
          status: HTTPStatusCode.CREATED,
          headers: {
            "location": `http://keycloak_address/auth/admin/realms/realm/users/${userIdMock}`
          }
        });
      const createOrUpdateUserSpy = jest.spyOn(userRepository, "createOrUpdateUser").mockResolvedValue(userIdMock);
      await UserService.createUser(payload);
      expect(apiClientSpy).toHaveBeenCalledTimes(2);
      expect(createOrUpdateUserSpy).toHaveBeenCalled();
    });
  });
});
