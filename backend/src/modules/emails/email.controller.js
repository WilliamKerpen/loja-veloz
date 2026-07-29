// Controlador de emails / Email controller
// Recebe requisições HTTP e envia respostas / Receives HTTP requests and sends responses

import { sendEmail } from "./email.service.js";

export async function test(req, res) {
  try {
    await sendEmail({
      to: req.body.to,
      subject: "Teste de email / Email test",
      html: "<h1>Email enviado com sucesso!</h1>",
      text: "Email enviado com sucesso!"
    });

    res.json({ message: "Email enviado / Email sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
