// Serviço do dashboard admin / Admin dashboard service
// Contém regras de negócio / Contains business logic

import * as repo from "./admin.repository.js";

export async function listOrders() {
  return await repo.getAllOrders();
}

export async function listOrderItems(orderId) {
  return await repo.getOrderItems(orderId);
}

export async function listPayments() {
  return await repo.getPayments();
}

export async function listProducts() {
  return await repo.getProducts();
}

export async function listCategories() {
  return await repo.getCategories();
}

export async function listUsers() {
  return await repo.getUsers();
}
