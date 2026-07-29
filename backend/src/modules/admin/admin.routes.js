// Rotas do dashboard admin / Admin dashboard routes
// Define endpoints da API / Defines API endpoints

import express from "express";
import { auth, admin } from "../users/user.middleware.js";
import { orders, orderItems, payments, products, categories, users } from "./admin.controller.js";

const router = express.Router();

// Todas as rotas são protegidas / All routes are protected
router.get("/orders", auth, admin, orders);
router.get("/orders/:id/items", auth, admin, orderItems);

router.get("/payments", auth, admin, payments);

router.get("/products", auth, admin, products);
router.get("/categories", auth, admin, categories);

router.get("/users", auth, admin, users);

export default router;
