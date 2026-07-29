// Script para criar usuário administrador
// Script to create administrator user
// Executar no /backend: node src/seed/seed-admin.js
// Run in /backend: node src/seed/seed-admin.js

import { env } from "../config/env.js"; // usa a config centralizada

import pkg from "pg";
import bcrypt from "bcrypt";

const { Pool } = pkg;

// Conexão com PostgreSQL usando env.js
// PostgreSQL connection using env.js
const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

async function createAdmin() {
  try {
    // Gerar hash da senha
    // Generate password hash
    const passwordHash = await bcrypt.hash("admin123", 10);

    // Inserir admin na tabela "user"
    // Insert admin into "user" table
    await pool.query(
      `INSERT INTO "user" (email, password_hash, name, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO NOTHING`,
      ["admin@loja.com", passwordHash, "Administrador", "ADMIN"]
    );

    console.log("✔ Usuário admin criado / Admin user created");
  } catch (err) {
    console.error("Erro ao criar admin / Error creating admin:", err);
  } finally {
    pool.end();
  }
}

createAdmin();