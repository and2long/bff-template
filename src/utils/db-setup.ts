import path from "path";
import { Sequelize } from "sequelize-typescript";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dbConfig = require("../config/db-config.js");
export const sequelize = new Sequelize(dbConfig);
const entityPath = path.resolve(__dirname, "../sequelize/entities");
sequelize.addModels([ entityPath ]);

export const setupDB = async () => {
  await sequelize.authenticate();
};
