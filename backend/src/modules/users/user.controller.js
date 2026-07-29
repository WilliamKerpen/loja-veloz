// Controlador de usuários / User controller
// Recebe requisições HTTP e envia respostas / Receives HTTP requests and sends responses

import * as service from "./user.service.js";

// Registrar usuário / Register user
export async function register(req, res) {
  try {
    const user = await service.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Login / Login
export async function login(req, res) {
  try {
    const data = await service.loginUser(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
