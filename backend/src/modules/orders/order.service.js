// Serviço de pedidos / Order service
// Contém regras de negócio / Contains business logic

import * as repo from "./order.repository.js";
import { sendOrderConfirmation, notifyAdmin } from "../emails/email.service.js";

// Verificar estoque antes da compra / Check stock before purchase
export async function checkStock(items) {
  for (const item of items) {
    const stock = await repo.getProductStock(item.productId);

    if (stock < item.quantity) {
      throw new Error(
        `Estoque insuficiente para o produto ${item.productId} / Insufficient stock`
      );
    }
  }
}

// Reduzir estoque após compra / Reduce stock after purchase
export async function reduceStockAfterOrder(items) {
  for (const item of items) {
    await repo.reduceStock(item.productId, item.quantity);
  }
}

// Criar pedido completo / Create full order
export async function createFullOrder(orderData) {
  // 1. Verificar estoque
  await checkStock(orderData.items);

  // 2. Criar pedido
  const order = await repo.createOrder(orderData);

  // 3. Criar itens
  const items = await repo.createOrderItems(order.id, orderData.items);

  // 4. Reduzir estoque
  await reduceStockAfterOrder(orderData.items);

  // 5. Enviar emails
  await sendOrderConfirmation(order, items);
  await notifyAdmin(order);

  return order;
}
