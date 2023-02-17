import path from "path";
import { Sequelize } from "sequelize-typescript";

const dbConfig = require("../config/config.js")
export const sequelize = new Sequelize(dbConfig);
const entityPath = path.resolve(__dirname, "../entities");
sequelize.addModels([entityPath]);

export const setup = async () => {
  await sequelize.authenticate();
}