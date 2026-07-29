// Rotas de pedidos / Order routes
// Define endpoints da API / Defines API endpoints

import express from "express";
import { create } from "./order.controller.js";
import { auth } from "../users/user.middleware.js";

const router = express.Router();

// Criar pedido (guest ou logado) / Create order (guest or logged)
router.post("/", create);

export default router;
