// Rotas de suporte / Support routes
// Define endpoints da API / Defines API endpoints

import express from "express";
import { auth, admin } from "../users/user.middleware.js";
import { create, myTickets, allTickets, respond, close } from "./support.controller.js";

const router = express.Router();

// Usuário cria ticket / User creates ticket
router.post("/", auth, create);

// Usuário vê seus tickets / User sees own tickets
router.get("/my", auth, myTickets);

// Admin vê todos os tickets / Admin sees all tickets
router.get("/", auth, admin, allTickets);

// Admin responde ticket / Admin responds
router.put("/:id/respond", auth, admin, respond);

// Admin fecha ticket / Admin closes
router.put("/:id/close", auth, admin, close);

export default router;
