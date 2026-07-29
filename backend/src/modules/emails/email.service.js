// Serviço de email / Email service
// Contém regras de envio e templates / Contains sending logic and templates

import { mailer } from "./email.config.js";

// Enviar email genérico / Send generic email
export async function sendEmail({ to, subject, html, text }) {
  return await mailer.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    text
  });
}

// Template: confirmação de pedido / Order confirmation template
export function orderConfirmationTemplate(order, items) {
  const itemList = items
    .map(item => `<li>${item.quantity}x ${item.name} — €${item.unit_price}</li>`)
    .join("");

  return {
    subject: `Pedido #${order.id} confirmado`,
    html: `
      <h2>Olá ${order.customer_name},</h2>
      <p>Seu pedido foi confirmado com sucesso!</p>
      <p><strong>Total:</strong> €${order.total_amount}</p>
      <p><strong>Itens:</strong></p>
      <ul>${itemList}</ul>
      <p>Obrigado por comprar na Loja Veloz!</p>
    `,
    text: `
      Olá ${order.customer_name},
      Seu pedido foi confirmado.
      Total: €${order.total_amount}
      Itens:
      ${items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
    `
  };
}

// Enviar email de confirmação de pedido / Send order confirmation email
export async function sendOrderConfirmation(order, items) {
  const template = orderConfirmationTemplate(order, items);

  return await sendEmail({
    to: order.customer_email,
    subject: template.subject,
    html: template.html,
    text: template.text
  });
}

// Enviar email para admin / Send email to admin
export async function notifyAdmin(order) {
  return await sendEmail({
    to: process.env.EMAIL_ADMIN,
    subject: `Novo pedido recebido #${order.id}`,
    html: `
      <h2>Novo pedido recebido</h2>
      <p>Cliente: ${order.customer_name}</p>
      <p>Total: €${order.total_amount}</p>
    `,
    text: `Novo pedido recebido. Cliente: ${order.customer_name}, Total: €${order.total_amount}`
  });
}
