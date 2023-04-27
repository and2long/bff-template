import { sequelize, setupDB } from "../../src/utils/db-setup";

describe("db-setup", () => {
  test("should call authenticate of sequelize", async () => {
    const authenticateSpy = jest.spyOn(sequelize, "authenticate");
    await setupDB();
    expect(authenticateSpy).toHaveBeenCalled();
  });
});