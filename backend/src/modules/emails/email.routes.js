// Rotas de email / Email routes
// Define endpoints da API / Defines API endpoints

import express from "express";
import { test } from "./email.controller.js";
import { auth, admin } from "../users/user.middleware.js";

const router = express.Router();

// Teste de envio (somente admin) / Send test email (admin only)
router.post("/test", auth, admin, test);

export default router;
