// Serviço de logs / Logs service
// Contém regras de negócio / Contains business logic

import * as repo from "./log.repository.js";

// Criar log / Create log
export async function addLog(userId, action, details, ip) {
  return await repo.createLog({
    userId,
    action,
    details: JSON.stringify(details),
    ip
  });
}

// Listar logs / List logs
export async function listLogs() {
  return await repo.getLogs();
}
