import path from "path";
import { Sequelize } from "sequelize-typescript";

const dbConfig = require("../config/db-config.js")
export const sequelize = new Sequelize(dbConfig);
const entityPath = path.resolve(__dirname, "../entities");
sequelize.addModels([entityPath]);

export const setupDB = async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log("db connect error: ", error);
  }
}
