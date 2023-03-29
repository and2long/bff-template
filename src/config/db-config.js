const dbConfig = {
  username: "postgres",
  host: process.env.DB_HOST,
  port: "5432",
  password: "password",
  database: "qunai",
  dialect: "postgres",
  pool: {
    min: 10,
    max: 30
  },
  // timezone: require("moment")().format("Z"),
  dialectOptions: {
    useUTC: false
  },
  logging: false
};
module.exports = dbConfig;
