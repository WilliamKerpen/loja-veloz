// Serviço de pagamentos / Payment service
// Contém regras de negócio e integração com Stripe / Contains business logic and Stripe integration

import Stripe from "stripe";
import * as repo from "./payment.repository.js";
import * as orderRepo from "../orders/order.repository.js";

let stripe;

// Inicializa Stripe somente quando necessário
export function getStripe() {
    if (!stripe) {
        stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }
    return stripe;
}

// Criar pagamento / Create payment
export async function createPayment(orderId) {
    const stripe = getStripe(); // inicializa aqui

    // Buscar pedido / Fetch order
    const order = await orderRepo.getOrderById(orderId);

    if (!order) {
        throw new Error("Pedido não encontrado / Order not found");
    }

    // Criar Payment Intent no Stripe / Create Payment Intent in Stripe
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(order.total_amount * 100), // Stripe usa centavos / Stripe uses cents
        currency: "eur",
        metadata: {
            orderId: order.id
        }
    });

    // Salvar pagamento no banco / Save payment in database
    await repo.savePayment(
        order.id,
        paymentIntent.id,
        order.total_amount,
        paymentIntent.status
    );

    return paymentIntent;
}

// Confirmar pagamento / Confirm payment
export async function confirmPayment(paymentIntentId) {
    const stripe = getStripe(); // inicializa aqui

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "succeeded") {
        throw new Error("Pagamento não confirmado / Payment not confirmed");
    }

    return paymentIntent;
}
