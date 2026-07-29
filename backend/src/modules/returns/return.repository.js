// Repositório de devoluções / Returns repository
// Responsável por acessar o banco / Responsible for accessing the database

import { db } from "../../config/database.js";

// Criar solicitação de devolução / Create return request
export async function createReturnRequest({ orderId, userId, reason }) {
  const query = `
    INSERT INTO return_request (order_id, user_id, reason)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await db.query(query, [orderId, userId, reason]);
  return result.rows[0];
}

// Buscar devolução / Get return request
export async function getReturnById(id) {
  const query = `
    SELECT * FROM return_request WHERE id = $1;
  `;
  const result = await db.query(query, [id]);
  return result.rows[0];
}

// Atualizar status / Update status
export async function updateReturnStatus(id, status) {
  const query = `
    UPDATE return_request
    SET status = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *;
  `;
  const result = await db.query(query, [status, id]);
  return result.rows[0];
}

// Buscar itens do pedido / Fetch order items
export async function getOrderItems(orderId) {
  const query = `
    SELECT * FROM order_item WHERE order_id = $1;
  `;
  const result = await db.query(query, [orderId]);
  return result.rows;
}

// Repor estoque / Restock product
export async function restockProduct(productId, quantity) {
  const query = `
    UPDATE product
    SET stock_quantity = stock_quantity + $1
    WHERE id = $2;
  `;
  await db.query(query, [quantity, productId]);
}
