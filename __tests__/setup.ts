import { sequelize } from "../src/utils/db-setup";
import { NextFunction, Request, Response } from "express";

export const protectRouteSpy = jest.fn();

jest.mock("keycloak-connect", () => {
  return jest.fn().mockImplementation(() => {
    return {
      middleware: () => (req: Request, res: Response, next: NextFunction) => {
        next();
      },
      protect: () => (req: Request, res: Response, next: NextFunction) => {
        protectRouteSpy();
        next();
      },
      getGrant: Promise.resolve({})
    };
  });
});

beforeAll(async () => {
  await sequelize.authenticate();
});

afterAll(async () => {
  await sequelize.close();
});
