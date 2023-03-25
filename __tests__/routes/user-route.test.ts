import { UserService } from "../../src/services/user-service";
import { app } from "../../src/app";
import { UserCreationRequest } from "../../src/interfaces/user";
import request from "supertest";
import { BusinessError } from "../../src/errors/business-error";
import { HTTPStatusCode } from "../../src/constants/http-status-code";
import { UserDTO } from "../../src/dtos/user-dto";
import { Gender } from "../../src/constants/gender";

describe("userRoute", () => {
  const baseUrl = "/api/users";
  const mockUserId = "mock user id";
  const user: UserDTO = {
    userId: mockUserId,
    username: "username",
    gender: Gender.MALE
  };
  const userCreationRequest: UserCreationRequest = {
    username: "username",
    password: "password",
  };
  const userCreationSuccessRes = {
    userId: mockUserId,
  };

  describe("GET / - get user list", () => {
    test("should get user list by call user service", async () => {
      const findAllSpy = jest.spyOn(UserService, "findAll").mockResolvedValue([ user ]);
      const response = await request(app).get(baseUrl);
      expect(findAllSpy).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([ user ]);
    });
  });

  describe("POST / - create user", () => {
    test("should create new user by calling user service", async () => {
      const createUserSpy = jest.spyOn(UserService, "createUser").mockResolvedValue(userCreationSuccessRes);
      await request(app).post(baseUrl).send(userCreationRequest).expect(201).expect(userCreationSuccessRes);
      expect(createUserSpy).toHaveBeenCalledWith(userCreationRequest);
    });

    test("should get 400 bad request with error message when username exists", async () => {
      const createUserSpy = jest.spyOn(UserService, "createUser").mockRejectedValue(
        new BusinessError("foo", "bar")
      );
      const response = await request(app).post(baseUrl).send(userCreationRequest);
      expect(createUserSpy).toHaveBeenCalledWith(userCreationRequest);
      expect(response.status).toBe(HTTPStatusCode.BAD_REQUEST);
      expect(response.body.id).toBeDefined();
      expect(response.body.type).toEqual("business");
      expect(response.body.message).toEqual("foo");
      expect(response.body.code).toEqual("bar");
    });
  });
});
