// Repositório do dashboard admin / Admin dashboard repository
// Responsável por acessar o banco / Responsible for accessing the database

import { db } from "../../config/database.js";

// Listar todos os pedidos / List all orders
export async function getAllOrders() {
  const query = `
    SELECT o.*, u.name AS user_name
    FROM "order" o
    LEFT JOIN "user" u ON u.id = o.user_id
    ORDER BY o.id DESC;
  `;
  const result = await db.query(query);
  return result.rows;
}

// Listar itens de um pedido / List order items
export async function getOrderItems(orderId) {
  const query = `
    SELECT oi.*, p.name, p.image_url
    FROM order_item oi
    JOIN product p ON p.id = oi.product_id
    WHERE oi.order_id = $1;
  `;
  const result = await db.query(query, [orderId]);
  return result.rows;
}

// Listar pagamentos / List payments
export async function getPayments() {
  const query = `
    SELECT p.*, o.customer_name, o.total_amount
    FROM payment p
    JOIN "order" o ON o.id = p.order_id
    ORDER BY p.id DESC;
  `;
  const result = await db.query(query);
  return result.rows;
}

// Listar produtos / List products
export async function getProducts() {
  const query = `
    SELECT p.*, c.name AS category_name
    FROM product p
    LEFT JOIN category c ON c.id = p.category_id
    ORDER BY p.id DESC;
  `;
  const result = await db.query(query);
  return result.rows;
}

// Listar categorias / List categories
export async function getCategories() {
  const query = `
    SELECT * FROM category ORDER BY id DESC;
  `;
  const result = await db.query(query);
  return result.rows;
}

// Listar usuários / List users
export async function getUsers() {
  const query = `
    SELECT id, name, email, role
    FROM "user"
    ORDER BY id DESC;
  `;
  const result = await db.query(query);
  return result.rows;
}
