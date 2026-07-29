// Serviço de carrinho / Cart service
// Contém regras de negócio / Contains business logic

import * as repo from "./cart.repository.js";

// Listar carrinho / List cart
export async function listCart(userId) {
  return await repo.getCartByUser(userId);
}

// Adicionar item / Add item
export async function addItem(userId, productId, quantity) {
  const existing = await repo.getCartItem(userId, productId);

  if (existing) {
    // Atualizar quantidade / Update quantity
    const newQty = existing.quantity + quantity;
    return await repo.updateCartItem(userId, productId, newQty);
  }

  // Criar novo item / Create new item
  return await repo.addCartItem(userId, productId, quantity);
}

// Atualizar item / Update item
export async function updateItem(userId, productId, quantity) {
  return await repo.updateCartItem(userId, productId, quantity);
}

// Remover item / Remove item
export async function removeItem(userId, productId) {
  return await repo.removeCartItem(userId, productId);
}

// Limpar carrinho / Clear cart
export async function clear(userId) {
  return await repo.clearCart(userId);
}
