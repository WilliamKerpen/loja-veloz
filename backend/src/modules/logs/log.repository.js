// Repositório de logs / Logs repository
// Responsável por acessar o banco de dados / Responsible for accessing the database

import { db } from "../../config/database.js";

// Criar log / Create log
export async function createLog({ userId, action, details, ip }) {
  const query = `
    INSERT INTO log (user_id, action, details, ip_address)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await db.query(query, [userId, action, details, ip]);
  return result.rows[0];
}

// Listar logs / List logs
export async function getLogs() {
  const query = `
    SELECT l.*, u.name AS user_name, u.email AS user_email
    FROM log l
    LEFT JOIN "user" u ON u.id = l.user_id
    ORDER BY l.id DESC;
  `;
  const result = await db.query(query);
  return result.rows;
}
