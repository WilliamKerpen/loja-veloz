// Repositório do carrinho / Cart repository
// Responsável por acessar o banco de dados / Responsible for accessing the database

import { db } from "../../config/database.js";

// Buscar itens do carrinho por usuário / Fetch cart items by user
export async function getCartByUser(userId) {
  const query = `
    SELECT c.*, p.name, p.price, p.image_url
    FROM cart_item c
    JOIN product p ON p.id = c.product_id
    WHERE c.user_id = $1
    ORDER BY c.id DESC;
  `;
  const result = await db.query(query, [userId]);
  return result.rows;
}

// Buscar item específico / Fetch specific cart item
export async function getCartItem(userId, productId) {
  const query = `
    SELECT * FROM cart_item
    WHERE user_id = $1 AND product_id = $2;
  `;
  const result = await db.query(query, [userId, productId]);
  return result.rows[0];
}

// Adicionar item ao carrinho / Add item to cart
export async function addCartItem(userId, productId, quantity) {
  const query = `
    INSERT INTO cart_item (user_id, product_id, quantity)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await db.query(query, [userId, productId, quantity]);
  return result.rows[0];
}

// Atualizar quantidade / Update quantity
export async function updateCartItem(userId, productId, quantity) {
  const query = `
    UPDATE cart_item
    SET quantity = $1
    WHERE user_id = $2 AND product_id = $3
    RETURNING *;
  `;
  const result = await db.query(query, [quantity, userId, productId]);
  return result.rows[0];
}

// Remover item / Remove item
export async function removeCartItem(userId, productId) {
  const query = `
    DELETE FROM cart_item
    WHERE user_id = $1 AND product_id = $2
    RETURNING *;
  `;
  const result = await db.query(query, [userId, productId]);
  return result.rows[0];
}

// Limpar carrinho / Clear cart
export async function clearCart(userId) {
  const query = `
    DELETE FROM cart_item
    WHERE user_id = $1;
  `;
  await db.query(query, [userId]);
}
