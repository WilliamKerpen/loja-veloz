// Conexão com PostgreSQL usando pg (driver oficial)
// PostgreSQL connection using pg official driver


import pkg from "pg";
import { env } from "./env.js";


const { Pool } = pkg;

export const db = new Pool({
  connectionString: env.DATABASE_URL,
  ssl: false,
});

db.connect()
  .then(() => console.log("PostgreSQL conectado com sucesso!"))
  .catch((err) =>
    console.error("Erro ao conectar no PostgreSQL:", err)
  );