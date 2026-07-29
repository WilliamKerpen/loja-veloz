// Controlador do carrinho / Cart controller
// Recebe requisições HTTP e envia respostas / Receives HTTP requests and sends responses

import * as service from "./cart.service.js";

// Listar carrinho / List cart
export async function list(req, res) {
  try {
    const items = await service.listCart(req.user.id);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar carrinho / Error listing cart" });
  }
}

// Adicionar item / Add item
export async function add(req, res) {
  try {
    const { productId, quantity } = req.body;
    const item = await service.addItem(req.user.id, productId, quantity);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Atualizar item / Update item
export async function update(req, res) {
  try {
    const { productId, quantity } = req.body;
    const item = await service.updateItem(req.user.id, productId, quantity);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Remover item / Remove item
export async function remove(req, res) {
  try {
    const { productId } = req.params;
    const item = await service.removeItem(req.user.id, productId);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Limpar carrinho / Clear cart
export async function clear(req, res) {
  try {
    await service.clear(req.user.id);
    res.json({ message: "Carrinho limpo / Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
