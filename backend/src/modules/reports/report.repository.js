// Repositório de relatórios / Reports repository
// Executa consultas analíticas no banco / Executes analytical queries in the database

import { db } from "../../config/database.js";

// Faturamento total / Total revenue
export async function getTotalRevenue() {
  const query = `
    SELECT SUM(total_amount) AS revenue
    FROM "order"
    WHERE status = 'PAID';
  `;
  const result = await db.query(query);
  return result.rows[0];
}

// Faturamento por mês / Monthly revenue
export async function getMonthlyRevenue() {
  const query = `
    SELECT
      DATE_TRUNC('month', created_at) AS month,
      SUM(total_amount) AS revenue
    FROM "order"
    WHERE status = 'PAID'
    GROUP BY month
    ORDER BY month DESC;
  `;
  const result = await db.query(query);
  return result.rows;
}

// Produtos mais vendidos / Best selling products
export async function getBestSellingProducts() {
  const query = `
    SELECT
      p.id,
      p.name,
      SUM(oi.quantity) AS total_sold
    FROM order_item oi
    JOIN product p ON p.id = oi.product_id
    GROUP BY p.id
    ORDER BY total_sold DESC
    LIMIT 10;
  `;
  const result = await db.query(query);
  return result.rows;
}

// Clientes que mais compram / Top customers
export async function getTopCustomers() {
  const query = `
    SELECT
      o.customer_email,
      o.customer_name,
      COUNT(*) AS orders_count,
      SUM(o.total_amount) AS total_spent
    FROM "order" o
    WHERE status = 'PAID'
    GROUP BY o.customer_email, o.customer_name
    ORDER BY total_spent DESC
    LIMIT 10;
  `;
  const result = await db.query(query);
  return result.rows;
}

// Estoque crítico / Low stock products
export async function getLowStockProducts() {
  const query = `
    SELECT *
    FROM product
    WHERE stock_quantity <= 5
    ORDER BY stock_quantity ASC;
  `;
  const result = await db.query(query);
  return result.rows;
}

// Total de pedidos / Total orders
export async function getTotalOrders() {
  const query = `
    SELECT COUNT(*) AS total_orders
    FROM "order";
  `;
  const result = await db.query(query);
  return result.rows[0];
}
