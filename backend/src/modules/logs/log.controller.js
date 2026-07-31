// Controlador de logs / Logs controller
// Recebe requisições HTTP e envia respostas / Receives HTTP requests and sends responses

import * as service from "./log.service.js";

// Listar logs / List logs
export async function list(req, res) {
  try {
    const logs = await service.listLogs();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar logs / Error listing logs" });
  }
}
