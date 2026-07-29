// Rotas de categorias / Category routes
// Define endpoints da API / Defines API endpoints

import express from "express";
import { list, get, create, update, remove } from "./category.controller.js";
import { auth, admin } from "../users/user.middleware.js";

const router = express.Router();

router.get("/", list);          // Listar / List
router.get("/:id", get);        // Buscar / Get
router.post("/", create, auth, admin);       // Criar / Create
router.put("/:id", update, auth, admin);   // Atualizar / Update
router.delete("/:id", remove, auth, admin);  // Remover / Delete

export default router;
