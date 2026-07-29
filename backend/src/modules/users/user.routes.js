// Rotas de usuários / User routes
// Define endpoints da API / Defines API endpoints

import express from "express";
import { register, login } from "./user.controller.js";

const router = express.Router();

router.post("/register", register); // Registrar / Register
router.post("/login", login);       // Login / Login

export default router;
