// ============================================================
// Conexão com PostgreSQL usando o driver oficial "pg"
// PostgreSQL connection using the official "pg" driver
// ============================================================

import pkg from "pg";
import { env } from "./env.js";

const { Pool } = pkg;

// Variável que armazenará o pool de conexão
// Variable that will store the connection pool
let db = null;

// ============================================================
// Ambiente de teste não deve abrir conexão com o banco
// Test environment should NOT open a database connection
// ============================================================
//
// Em testes (NODE_ENV = "test"), o GitHub Actions não possui
// PostgreSQL rodando. Se tentarmos conectar, o teste falha.
// In test mode (NODE_ENV = "test"), GitHub Actions does not
// have PostgreSQL running. If we try to connect, tests fail.
//
if (process.env.NODE_ENV !== "test") {
  db = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: false,
  });

  // Tentativa de conexão ao banco
  // Attempt to connect to the database
  db.connect()
    .then(() => {
      console.log("PostgreSQL conectado com sucesso");
    })
    .catch((err) => {
      console.error("Erro ao conectar no PostgreSQL:", err);
    });
}

// Exporta o pool (ou null em ambiente de teste)
// Exports the pool (or null in test environment)
export { db };
