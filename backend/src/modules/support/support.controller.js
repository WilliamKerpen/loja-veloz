// Controlador de suporte / Support controller
// Recebe requisições HTTP e envia respostas / Receives HTTP requests and sends responses

import * as service from "./support.service.js";

// Criar ticket / Create ticket
export async function create(req, res) {
  try {
    const { subject, message } = req.body;

    const ticket = await service.createTicket(
      req.user.id,
      subject,
      message,
      req.ip
    );

    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Listar tickets do usuário / List user tickets
export async function myTickets(req, res) {
  try {
    const tickets = await service.listUserTickets(req.user.id);
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Listar todos os tickets (admin) / List all tickets (admin)
export async function allTickets(req, res) {
  try {
    const tickets = await service.listAllTickets();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Admin responde ticket / Admin responds ticket
export async function respond(req, res) {
  try {
    const { response } = req.body;

    const ticket = await service.respondTicket(
      req.params.id,
      req.user.id,
      response,
      req.ip
    );

    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Admin fecha ticket / Admin closes ticket
export async function close(req, res) {
  try {
    const ticket = await service.closeTicket(
      req.params.id,
      req.user.id,
      req.ip
    );

    res.json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
