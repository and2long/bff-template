import userRepository from "../../src/repositoris/user-repository";
import { Gender } from "../../src/constants/gender";
import User from "../../src/sequelize/entities/user";

describe("UserRepository", () => {
  const userId = "";
  const username = "zhangSan";
  const gender = Gender.MALE;
  const mockUserId = "5e51c943-213e-4f1e-907b-1b076f784268";

  afterEach(async () => {
    await User.destroy({ where: { userId: mockUserId } });
  });

  test("should return all users", async () => {
    jest.spyOn(userRepository, "findAll").mockResolvedValue([ { userId, username, gender } ]);
    const result = await userRepository.findAll();
    expect(result).toEqual([ { userId, username, gender } ]);
  });

  describe("createOrUpdateUser", () => {
    test("should create user with given data if not exists", async () => {
      const userExisting = await User.findOne({ where: { userId: mockUserId } });
      const userId = await userRepository.createOrUpdateUser({ userId: mockUserId, username });
      const userCreated = await User.findOne({ where: { userId: mockUserId } });
      expect(userExisting).toBeNull();
      expect(userId).toEqual(mockUserId);
      expect(userCreated?.userId).toEqual(mockUserId);
      expect(userCreated?.username).toEqual(username);
    });

    test("should update user with given data if exists", async () => {
      await User.create({ userId: mockUserId, username });
      const userExisting = await User.findOne({ where: { userId: mockUserId } });
      const userId = await userRepository.createOrUpdateUser({ userId: mockUserId, username });
      const userCreated = await User.findOne({ where: { userId: mockUserId } });
      expect(userExisting).not.toBeNull();
      expect(userId).toEqual(mockUserId);
      expect(userCreated?.userId).toEqual(mockUserId);
      expect(userCreated?.username).toEqual(username);
    });
  });

});
