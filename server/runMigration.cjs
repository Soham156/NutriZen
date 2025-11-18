const { Pool } = require("pg");
const fs = require("fs");
require("dotenv").config();

// Use direct connection (port 5432) instead of pooler for migrations
const directConnectionString = process.env.DATABASE_URL.replace(
  "6543",
  "5432"
).replace("?pgbouncer=true&connection_limit=1", "");

const pool = new Pool({
  connectionString: directConnectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function runMigration() {
  try {
    const sql = fs.readFileSync(
      "./src/db/migrations/016-insert-default-recipes-fixed.sql",
      "utf8"
    );
    await pool.query(sql);
    console.log("✅ Successfully inserted default recipes into the database!");
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error inserting recipes:", error.message);
    console.error("Full error:", error);
    await pool.end();
    process.exit(1);
  }
}

runMigration();
