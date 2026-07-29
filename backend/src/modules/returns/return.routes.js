// Rotas de devoluções / Returns routes
// Define endpoints da API / Defines API endpoints

import express from "express";
import { auth, admin } from "../users/user.middleware.js";
import { request, approve, reject } from "./return.controller.js";

const router = express.Router();

// Cliente solicita devolução / Customer requests return
router.post("/", auth, request);

// Admin aprova / Admin approves
router.put("/:id/approve", auth, admin, approve);

// Admin rejeita / Admin rejects
router.put("/:id/reject", auth, admin, reject);

export default router;
