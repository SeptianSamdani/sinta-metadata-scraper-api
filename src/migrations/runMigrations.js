const fs = require("fs");
const path = require("path");
const pool = require("../config/database");

(async () => {
  const migrationsDir = __dirname;
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  console.log("Running migrations:", files);

  for (const file of files) {
    const fullPath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(fullPath, "utf8");

    console.log(`\n>>> Running ${file}`);
    try {
      await pool.query(sql);
      console.log(`SUCCESS: ${file}`);
    } catch (err) {
      console.error(`FAILED: ${file}`);
      console.error(err);
      process.exit(1);
    }
  }

  console.log("\nAll migrations completed.");
  process.exit(0);
})();
