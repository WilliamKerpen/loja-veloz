// Controlador de pedidos / Order controller
// Recebe requisições HTTP e envia respostas / Receives HTTP requests and sends responses

import * as service from "./order.service.js";

// Criar pedido / Create order
export async function create(req, res) {
  try {
    const order = await service.createFullOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
