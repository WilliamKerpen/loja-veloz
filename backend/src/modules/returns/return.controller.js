// Controlador de devoluções / Returns controller
// Recebe requisições HTTP e envia respostas / Receives HTTP requests and sends responses

import * as service from "./return.service.js";

// Cliente solicita devolução / Customer requests return
export async function request(req, res) {
  try {
    const { orderId, reason } = req.body;

    const result = await service.requestReturn(
      orderId,
      req.user.id,
      reason,
      req.ip
    );

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Admin aprova devolução / Admin approves return
export async function approve(req, res) {
  try {
    const result = await service.approveReturn(
      req.params.id,
      req.user.id,
      req.ip
    );

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Admin rejeita devolução / Admin rejects return
export async function reject(req, res) {
  try {
    const result = await service.rejectReturn(
      req.params.id,
      req.user.id,
      req.ip
    );

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
