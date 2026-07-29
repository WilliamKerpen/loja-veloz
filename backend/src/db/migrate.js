import fs from "fs";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  const sql = fs.readFileSync("db/migrations/001_init.sql").toString();
  await pool.query(sql);
  console.log("✔ Migrações aplicadas com sucesso");
  pool.end();
}

migrate();
