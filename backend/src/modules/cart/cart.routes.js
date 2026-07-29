// Rotas do carrinho / Cart routes
// Define endpoints da API / Defines API endpoints

import express from "express";
import { list, add, update, remove, clear } from "./cart.controller.js";
import { auth } from "../users/user.middleware.js";

const router = express.Router();

router.get("/", auth, list);             // Listar / List
router.post("/", auth, add);             // Adicionar / Add
router.put("/", auth, update);           // Atualizar / Update
router.delete("/:productId", auth, remove); // Remover / Remove
router.delete("/", auth, clear);         // Limpar / Clear

export default router;
