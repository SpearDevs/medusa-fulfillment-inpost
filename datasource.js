const { DataSource } = require("typeorm")

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5433,
  username: "postgres",
  password: "postgres",
  database: "medusa-db-z3fyw",
  entities: [
    "dist/models/*.js",
  ],
  migrations: [
    "dist/migrations/*.js",
  ],
})

module.exports = {
  datasource: AppDataSource,
}
