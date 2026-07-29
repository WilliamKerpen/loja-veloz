// Controlador de relatórios / Reports controller
// Retorna métricas analíticas / Returns analytical metrics

import * as service from "./report.service.js";

// Métricas gerais / General metrics
export async function dashboard(req, res) {
  try {
    const metrics = await service.getDashboardMetrics();
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar métricas / Error generating metrics" });
  }
}

// Faturamento mensal / Monthly revenue
export async function monthly(req, res) {
  try {
    const data = await service.getMonthlyRevenue();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar relatório mensal / Error generating monthly report" });
  }
}

// Produtos mais vendidos / Best selling products
export async function bestProducts(req, res) {
  try {
    const data = await service.getBestSellingProducts();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar relatório de produtos / Error generating product report" });
  }
}

// Clientes top / Top customers
export async function topCustomers(req, res) {
  try {
    const data = await service.getTopCustomers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar relatório de clientes / Error generating customer report" });
  }
}

// Estoque crítico / Low stock
export async function lowStock(req, res) {
  try {
    const data = await service.getLowStockProducts();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar relatório de estoque / Error generating stock report" });
  }
}
