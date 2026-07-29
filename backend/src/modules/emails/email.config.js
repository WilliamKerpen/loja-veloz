// Configuração de email / Email configuration
// Cria o transporte SMTP / Creates SMTP transport

import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,        // Servidor SMTP / SMTP server
  port: process.env.SMTP_PORT,        // Porta / Port
  secure: true,                       // SSL
  auth: {
    user: process.env.SMTP_USER,      // Usuário SMTP / SMTP user
    pass: process.env.SMTP_PASS       // Senha SMTP / SMTP password
  }
});
