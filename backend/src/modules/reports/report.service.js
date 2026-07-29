// Serviço de relatórios / Reports service
// Processa dados e retorna métricas / Processes data and returns metrics

import * as repo from "./report.repository.js";

export async function getDashboardMetrics() {
  const revenue = await repo.getTotalRevenue();
  const orders = await repo.getTotalOrders();
  const lowStock = await repo.getLowStockProducts();

  return {
    revenue: revenue.revenue || 0,
    totalOrders: orders.total_orders || 0,
    lowStock
  };
}

export async function getMonthlyRevenue() {
  return await repo.getMonthlyRevenue();
}

export async function getBestSellingProducts() {
  return await repo.getBestSellingProducts();
}

export async function getTopCustomers() {
  return await repo.getTopCustomers();
}

export async function getLowStockProducts() {
  return await repo.getLowStockProducts();
}
