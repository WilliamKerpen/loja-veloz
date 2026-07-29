// Serviço de devoluções / Returns service
// Contém regras de negócio / Contains business logic

import * as repo from "./return.repository.js";
import { addLog } from "../logs/log.service.js";

// Criar solicitação / Create request
export async function requestReturn(orderId, userId, reason, ip) {
  const request = await repo.createReturnRequest({ orderId, userId, reason });

  await addLog(userId, "RETURN_REQUESTED", { orderId, reason }, ip);

  return request;
}

// Aprovar devolução / Approve return
export async function approveReturn(id, adminId, ip) {
  const request = await repo.getReturnById(id);

  if (!request) throw new Error("Devolução não encontrada / Return not found");

  // Repor estoque / Restock items
  const items = await repo.getOrderItems(request.order_id);

  for (const item of items) {
    await repo.restockProduct(item.product_id, item.quantity);
  }

  const updated = await repo.updateReturnStatus(id, "APPROVED");

  await addLog(adminId, "RETURN_APPROVED", { returnId: id }, ip);

  return updated;
}

// Rejeitar devolução / Reject return
export async function rejectReturn(id, adminId, ip) {
  const request = await repo.getReturnById(id);

  if (!request) throw new Error("Devolução não encontrada / Return not found");

  const updated = await repo.updateReturnStatus(id, "REJECTED");

  await addLog(adminId, "RETURN_REJECTED", { returnId: id }, ip);

  return updated;
}
