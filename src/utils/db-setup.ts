import path from "path";
import { Sequelize } from "sequelize-typescript";
import { dbConfig } from "../config/config";

export const sequelize = new Sequelize(dbConfig);
const entityPath = path.resolve(__dirname, "../entities");
sequelize.addModels([entityPath]);

export const setup = async () => {
  await sequelize.authenticate();
}