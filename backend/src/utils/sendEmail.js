const nodemailer = require("nodemailer");


// configuração do serviço de email
const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }

});

// função para enviar email
async function sendEmail(to, subject, text) {

  await transporter.sendMail({

    from: process.env.EMAIL_USER,
    to,
    subject,
    text

  });

}

module.exports = sendEmail;