// Repositório de pedidos / Order repository
// Responsável por acessar o banco de dados / Responsible for accessing the database

import { db } from "../../config/database.js";

// Criar pedido / Create order
export async function createOrder(orderData) {
  const query = `
    INSERT INTO "order" (
      user_id, customer_email, customer_name,
      customer_street, customer_number, customer_city,
      customer_country, customer_postal_code,
      status, total_amount
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *;
  `;

  const values = [
    orderData.userId || null,
    orderData.customerEmail,
    orderData.customerName,
    orderData.customerStreet,
    orderData.customerNumber,
    orderData.customerCity,
    orderData.customerCountry,
    orderData.customerPostalCode,
    orderData.status,
    orderData.totalAmount
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

// Criar itens do pedido / Create order items
export async function createOrderItems(orderId, items) {
  const query = `
    INSERT INTO order_item (order_id, product_id, quantity, unit_price)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const createdItems = [];

  for (const item of items) {
    const result = await db.query(query, [
      orderId,
      item.productId,
      item.quantity,
      item.unitPrice
    ]);
    createdItems.push(result.rows[0]);
  }

  return createdItems;
}

// Buscar estoque atual / Fetch current stock
export async function getProductStock(productId) {
  const query = "SELECT stock_quantity FROM product WHERE id = $1";
  const result = await db.query(query, [productId]);
  return result.rows[0]?.stock_quantity;
}

// Reduzir estoque / Reduce stock
export async function reduceStock(productId, quantity) {
  const query = `
    UPDATE product
    SET stock_quantity = stock_quantity - $1
    WHERE id = $2
  `;
  await db.query(query, [quantity, productId]);
}
