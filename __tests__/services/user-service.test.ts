import { keycloakApiClient } from "../../src/http-client/http-client";
import { HTTPStatusCode } from "../../src/constants/http-status-code";
import { TechnicalError } from "../../src/errors/technical-error";
import { UserCreationRequest } from "../../src/interfaces/user";
import { UserService } from "../../src/services/user-service";
import { KEYCLOAK_REALM } from "../../src/utils/keycloak-setup";
import { BusinessError } from "../../src/errors/business-error";
import { UserErrorCode } from "../../src/constants/error-codes";
import envConfig from "../../src/config/env-config";
import { AxiosError, AxiosResponse } from "axios";

describe("UserService", () => {
  const accessTokenMock = "mock access token";
  const userIdMock = "mock user id";
  const clientSecret = envConfig.keycloakClientSecret;

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
        `/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
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
        `/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
        {
          "client_id": "qunai-medical",
          "client_secret": clientSecret,
          "grant_type": "client_credentials"
        });
    });
  });


  describe("createKeycloakUser", () => {
    const payload: UserCreationRequest = {
      username: "zhangSan",
      password: "password"
    };
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
          "credentials": [ {
            "temporary": false,
            "type": "password",
            "value": "password"
          } ], "enabled": true, "username": "zhangSan"
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
          "credentials": [ {
            "temporary": false,
            "type": "password",
            "value": "password"
          } ], "enabled": true, "username": "zhangSan"
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
          "credentials": [ {
            "temporary": false,
            "type": "password",
            "value": "password"
          } ], "enabled": true, "username": "zhangSan"
        }, { "headers": { "Authorization": "Bearer mock access token", "Content-Type": "application/json" } });
        expect(createKeycloakUserSpy).toHaveBeenCalledWith(payload);
      });
    });
  });
});
