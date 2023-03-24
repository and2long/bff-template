import { sequelize } from "../src/utils/db-setup";

beforeAll(async () => {
  await sequelize.authenticate();
});

afterAll(async () => {
  await sequelize.close();
});
