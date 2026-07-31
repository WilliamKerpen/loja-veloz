import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import productRoutes from "./modules/products/product.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";
import paymentRoutes from "./modules/payments/payment.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import emailRoutes from "./modules/emails/email.routes.js";
import logRoutes from "./modules/logs/log.routes.js";
import reportRoutes from "./modules/reports/report.routes.js";
import returnRoutes from "./modules/returns/return.routes.js";
import supportRoutes from "./modules/support/support.routes.js";
import healthRoutes from "./modules/health/health.routers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(cors({
    origin: [
        "*",
        "http://localhost:5500",
        "http://localhost:3000"
    ]
}));

app.use(helmet());

// Rotas
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);
app.use("/payments", paymentRoutes);
app.use("/admin", adminRoutes);
app.use("/emails", emailRoutes);
app.use("/logs", logRoutes);
app.use("/reports", reportRoutes);
app.use("/returns", returnRoutes);
app.use("/support", supportRoutes);
app.use("/health", healthRoutes);

// Servir imagens
app.use("/img", express.static(path.join(__dirname, "../public/img")));

// EXPORTA O APP PARA TESTES
export default app;

// INICIA O SERVIDOR APENAS QUANDO NÃO ESTIVER EM TESTE
if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("API rodando na porta 3000");
  });
}
