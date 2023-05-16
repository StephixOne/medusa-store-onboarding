const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "medusa-store",
  entities: [
    "dist/models/*.js",
    "node_modules/@medusajs/medusa/dist/models/!(*.index.js)",
  ],
  migrations: [
    "dist/migrations/*.js",
    "node_modules/@medusajs/medusa/dist/migrations/!(*.index.js)",
  ],
});

module.exports = {
  datasource: AppDataSource,
};
