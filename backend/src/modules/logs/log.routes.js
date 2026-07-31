// Rotas de logs / Logs routes
// Define endpoints da API / Defines API endpoints

import express from "express";
import { list } from "./log.controller.js";
import { auth, admin } from "../users/user.middleware.js";

const router = express.Router();

// Listar logs (somente admin) / List logs (admin only)
router.get("/", auth, admin, list);

export default router;
