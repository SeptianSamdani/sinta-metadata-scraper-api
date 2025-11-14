require("dotenv").config();

module.exports = {
  APP_PORT: process.env.APP_PORT || 3000,

  PG_HOST: process.env.PG_HOST || "localhost",
  PG_USER: process.env.PG_USER || "postgres",
  PG_PASSWORD: process.env.PG_PASSWORD || "",
  PG_DATABASE: process.env.PG_DATABASE || "sinta_db",
  PG_PORT: process.env.PG_PORT || 5432,
};
