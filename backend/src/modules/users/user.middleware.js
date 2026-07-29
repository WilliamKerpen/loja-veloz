// Middlewares de autenticação e autorização / Authentication & Authorization middlewares

import jwt from "jsonwebtoken";

// Autenticar usuário / Authenticate user
export function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Token não fornecido / Token not provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id, role
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido / Invalid token" });
  }
}

// Permitir somente admin / Allow only admin
export function admin(req, res, next) {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Acesso negado / Access denied" });

  next();
}
