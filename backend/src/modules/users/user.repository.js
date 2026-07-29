// Repositório de usuários / User repository
// Responsável por acessar o banco de dados / Responsible for accessing the database

import { db } from "../../config/database.js";

// Buscar usuário por email / Fetch user by email
export async function getUserByEmail(email) {
  const query = "SELECT * FROM \"user\" WHERE email = $1";
  const result = await db.query(query, [email]);
  return result.rows[0];
}

// Buscar usuário por ID / Fetch user by ID
export async function getUserById(id) {
  const query = "SELECT * FROM \"user\" WHERE id = $1";
  const result = await db.query(query, [id]);
  return result.rows[0];
}

// Criar usuário / Create user
export async function createUser({ name, email, passwordHash, role }) {
  const query = `
    INSERT INTO "user" (name, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await db.query(query, [name, email, passwordHash, role]);
  return result.rows[0];
}
