// Controlador de pagamentos / Payment controller
// Recebe requisições HTTP e envia respostas / Receives HTTP requests and sends responses

import * as service from "./payment.service.js";

// Criar pagamento / Create payment
export async function create(req, res) {
  try {
    const { orderId } = req.body;
    const paymentIntent = await service.createPayment(orderId);
    res.json(paymentIntent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Confirmar pagamento / Confirm payment
export async function confirm(req, res) {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await service.confirmPayment(paymentIntentId);
    res.json(paymentIntent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
