import userRepository from "../../src/repositoris/user-repository";
import { Gender } from "../../src/constants/gender";
import { keycloakApiClient } from "../../src/http-client/http-client";
import { HTTPStatusCode } from "../../src/constants/http-response";
import { TechnicalError } from "../../src/errors/technical-error";
import { UserCreationRequest } from "../../src/interfaces/user";

describe("UserRepository", () => {
  const userId = "";
  const username = "zhangSan";
  const gender = Gender.MALE;
  const accessTokenMock = "mock access token";
  const userIdMock = "mock user id";

  test("should return all users", async () => {
    jest.spyOn(userRepository, "findAll").mockResolvedValue([ { userId, username, gender } ]);
    const result = await userRepository.findAll();
    expect(result).toEqual([ { userId, username, gender } ]);
  });

  describe("getAccessToken", () => {
    test("should return access token when request success", async () => {
      jest.spyOn(keycloakApiClient, "post").mockResolvedValue({
        status: HTTPStatusCode.OK,
        data: {
          "access_token": accessTokenMock
        }
      });
      const result = await userRepository.getAccessToken();
      expect(result).toEqual(accessTokenMock);
    });

    test("should throw error for non-200 status codes", async () => {
      jest.spyOn(keycloakApiClient, "post").mockResolvedValue({
        status: HTTPStatusCode.BAD_REQUEST,
        data: {
          "error": "unsupported_grant_type",
          "error_description": "Unsupported grant_type"
        }
      });
      await expect(userRepository.getAccessToken()).rejects.toThrow(
        new TechnicalError("Failed to retrieve access_token.")
      );
    });
  });


  describe("createKeycloakUser", () => {
    const payload: UserCreationRequest = {
      username: "zhangSan",
      password: "password"
    };
    const createKeycloakUserSpy = jest.spyOn(userRepository, "createKeycloakUser");

    describe("getAccessToken failure", () => {
      test("should throw error when getAccessToken throw tech error", async () => {
        jest.spyOn(keycloakApiClient, "post").mockResolvedValue({
          status: HTTPStatusCode.BAD_REQUEST,
          data: {
            "error": "unsupported_grant_type",
            "error_description": "Unsupported grant_type"
          }
        });
        await expect(userRepository.createKeycloakUser(payload)).rejects.toThrow(
          new TechnicalError("Failed to retrieve access_token.")
        );
        expect(createKeycloakUserSpy).toHaveBeenCalledWith(payload);
      });
    });

    describe("getAccessToken success", () => {
      beforeEach(() => {
        jest.spyOn(userRepository, "getAccessToken").mockResolvedValue(accessTokenMock);
      });

      test("should return userId when create keycloak user success", async () => {
        jest.spyOn(keycloakApiClient, "post").mockResolvedValue({
          status: HTTPStatusCode.CREATED,
          headers: {
            "location": `http://keycloak_address/auth/admin/realms/realm/users/${userIdMock}`
          }
        });
        const result = await userRepository.createKeycloakUser(payload);
        expect(createKeycloakUserSpy).toHaveBeenCalledWith(payload);
        expect(result).toEqual({ userId: userIdMock })
      });

    });
  });
});
