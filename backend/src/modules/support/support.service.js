// Serviço de suporte / Support service
// Contém regras de negócio / Contains business logic

import * as repo from "./support.repository.js";
import { addLog } from "../logs/log.service.js";

// Criar ticket / Create ticket
export async function createTicket(userId, subject, message, ip) {
  const ticket = await repo.createTicket({ userId, subject, message });

  await addLog(userId, "SUPPORT_TICKET_CREATED", { ticketId: ticket.id }, ip);

  return ticket;
}

// Responder ticket / Respond ticket
export async function respondTicket(id, adminId, response, ip) {
  const ticket = await repo.respondTicket(id, response);

  await addLog(adminId, "SUPPORT_TICKET_ANSWERED", { ticketId: id }, ip);

  return ticket;
}

// Fechar ticket / Close ticket
export async function closeTicket(id, adminId, ip) {
  const ticket = await repo.closeTicket(id);

  await addLog(adminId, "SUPPORT_TICKET_CLOSED", { ticketId: id }, ip);

  return ticket;
}

// Listar tickets do usuário / List user tickets
export async function listUserTickets(userId) {
  return await repo.getUserTickets(userId);
}

// Listar todos os tickets (admin) / List all tickets (admin)
export async function listAllTickets() {
  return await repo.getAllTickets();
}
