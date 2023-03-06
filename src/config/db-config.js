const dbConfig = {
  username: "postgres",
  host: "127.0.0.1",
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
  logging: true
}
module.exports = dbConfig
