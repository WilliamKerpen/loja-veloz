// Rotas de pagamentos / Payment routes
// Define endpoints da API / Defines API endpoints

import express from "express";
import { create, confirm } from "./payment.controller.js";
import { auth } from "../users/user.middleware.js";

const router = express.Router();

// Criar pagamento / Create payment
router.post("/", auth, create);

// Confirmar pagamento / Confirm payment
router.post("/confirm", auth, confirm);

export default router;
