// Repositório de suporte / Support repository
// Responsável por acessar o banco / Responsible for accessing the database

import { db } from "../../config/database.js";

// Criar ticket / Create ticket
export async function createTicket({ userId, subject, message }) {
  const query = `
    INSERT INTO support_ticket (user_id, subject, message)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await db.query(query, [userId, subject, message]);
  return result.rows[0];
}

// Buscar ticket por ID / Get ticket by ID
export async function getTicketById(id) {
  const query = `SELECT * FROM support_ticket WHERE id = $1`;
  const result = await db.query(query, [id]);
  return result.rows[0];
}

// Listar tickets do usuário / List user tickets
export async function getUserTickets(userId) {
  const query = `
    SELECT * FROM support_ticket
    WHERE user_id = $1
    ORDER BY id DESC;
  `;
  const result = await db.query(query, [userId]);
  return result.rows;
}

// Listar todos os tickets (admin) / List all tickets (admin)
export async function getAllTickets() {
  const query = `
    SELECT st.*, u.name AS user_name, u.email AS user_email
    FROM support_ticket st
    JOIN "user" u ON u.id = st.user_id
    ORDER BY st.id DESC;
  `;
  const result = await db.query(query);
  return result.rows;
}

// Admin responde ticket / Admin responds ticket
export async function respondTicket(id, response) {
  const query = `
    UPDATE support_ticket
    SET admin_response = $1, status = 'ANSWERED', updated_at = NOW()
    WHERE id = $2
    RETURNING *;
  `;
  const result = await db.query(query, [response, id]);
  return result.rows[0];
}

// Admin fecha ticket / Admin closes ticket
export async function closeTicket(id) {
  const query = `
    UPDATE support_ticket
    SET status = 'CLOSED', updated_at = NOW()
    WHERE id = $1
    RETURNING *;
  `;
  const result = await db.query(query, [id]);
  return result.rows[0];
}
