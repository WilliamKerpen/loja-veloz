// Serviço de usuários / User service
// Contém regras de negócio / Contains business logic

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as repo from "./user.repository.js";

// Registrar usuário / Register user
export async function registerUser({ name, email, password, role }) {
  const existing = await repo.getUserByEmail(email);
  if (existing) throw new Error("Email já cadastrado / Email already registered");

  const passwordHash = await bcrypt.hash(password, 10);

  return await repo.createUser({
    name,
    email,
    passwordHash,
    role: role || "CUSTOMER"
  });
}

// Login de usuário / User login
export async function loginUser({ email, password }) {
  const user = await repo.getUserByEmail(email);
  if (!user) throw new Error("Usuário não encontrado / User not found");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Senha inválida / Invalid password");

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { user, token };
}
