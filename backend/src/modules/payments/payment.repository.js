// Repositório de pagamentos / Payment repository
// Responsável por acessar o banco de dados / Responsible for accessing the database

import { db } from "../../config/database.js";

// Salvar pagamento / Save payment
export async function savePayment(orderId, paymentIntentId, amount, status) {
  const query = `
    INSERT INTO payment (order_id, payment_intent_id, amount, status)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await db.query(query, [
    orderId,
    paymentIntentId,
    amount,
    status
  ]);

  return result.rows[0];
}
