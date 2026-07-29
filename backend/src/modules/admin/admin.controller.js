// Controlador do dashboard admin / Admin dashboard controller
// Recebe requisições HTTP e envia respostas / Receives HTTP requests and sends responses

import * as service from "./admin.service.js";

// Listar pedidos / List orders
export async function orders(req, res) {
  try {
    const data = await service.listOrders();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar pedidos / Error listing orders" });
  }
}

// Listar itens de um pedido / List order items
export async function orderItems(req, res) {
  try {
    const data = await service.listOrderItems(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar itens / Error listing items" });
  }
}

// Listar pagamentos / List payments
export async function payments(req, res) {
  try {
    const data = await service.listPayments();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar pagamentos / Error listing payments" });
  }
}

// Listar produtos / List products
export async function products(req, res) {
  try {
    const data = await service.listProducts();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar produtos / Error listing products" });
  }
}

// Listar categorias / List categories
export async function categories(req, res) {
  try {
    const data = await service.listCategories();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar categorias / Error listing categories" });
  }
}

// Listar usuários / List users
export async function users(req, res) {
  try {
    const data = await service.listUsers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar usuários / Error listing users" });
  }
}
