import { getUserId } from "../../src/utils/common";
import { keycloak } from "../../src/utils/keycloak-setup";

describe("common", () => {
  describe("getUserId", () => {
    test("should get sub value from access_token", async () => {
      const mockUserId = "mock user id";
      const accessToken = {
        "access_token": {
          content: {
            sub: mockUserId
          }
        }
      };
      jest.replaceProperty(keycloak, "getGrant", () => {
        return Promise.resolve(accessToken as any);
      });
      const userId = await getUserId({} as any, {} as any);
      expect(userId).toEqual(mockUserId);
    });
  });
});