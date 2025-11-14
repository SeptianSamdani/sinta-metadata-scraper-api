const { Pool } = require("pg");
const env = require("./env");

const pool = new Pool({
  host: env.PG_HOST,
  user: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
  port: env.PG_PORT,
});

module.exports = pool;
