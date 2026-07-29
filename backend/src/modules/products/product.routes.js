// Rotas de produtos / Product routes
// Define endpoints da API / Defines API endpoints

import express from "express";
import { list, get, create, update, remove } from "./product.controller.js";
import { auth, admin } from "../users/user.middleware.js";

const router = express.Router();

router.get("/", list);          // Listar / List
router.get("/:id", get);        // Buscar / Get
router.post("/", auth, admin, create);       // Criar / Create
router.put("/:id", auth, admin, update);     // Atualizar / Update
router.delete("/:id", auth, admin, remove);  // Remover / Delete

export default router;
