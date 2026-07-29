// Rotas de relatórios / Reports routes
// Define endpoints da API / Defines API endpoints

import express from "express";
import { auth, admin } from "../users/user.middleware.js";
import { dashboard, monthly, bestProducts, topCustomers, lowStock } from "./report.controller.js";

const router = express.Router();

router.get("/dashboard", auth, admin, dashboard);
router.get("/monthly", auth, admin, monthly);
router.get("/best-products", auth, admin, bestProducts);
router.get("/top-customers", auth, admin, topCustomers);
router.get("/low-stock", auth, admin, lowStock);

export default router;
