import userRepository from "../../src/repositoris/user-repository";
import { Gender } from "../../src/constants/gender";

describe("UserRepository", () => {
  const userId = "";
  const username = "zhangSan";
  const gender = Gender.MALE;

  test("should return all users", async () => {
    jest.spyOn(userRepository, "findAll").mockResolvedValue([ { userId, username, gender } ]);
    const result = await userRepository.findAll();
    expect(result).toEqual([ { userId, username, gender } ]);
  });

});
