// Teste de conexão com PostgreSQL
// PostgreSQL connection test

import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("Conectado ao PostgreSQL:", result.rows[0]);
  } catch (err) {
    console.error("Erro ao conectar:", err);
  }
}

main();
