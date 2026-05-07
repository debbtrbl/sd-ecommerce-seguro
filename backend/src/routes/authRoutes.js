const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saveLog = require("../utils/logger");

const router = express.Router();
let mfaCode = null;

// para enviar email de codigo de autenticacao
const sendEmail = require("../utils/sendEmail");


// usuário fake armazenado no sistema
// A senha original é 123456
const user = {
  email: "deboraalves.uni@gmail.com",

  // senha criptografada com bcrypt
  password: "$2b$10$dzD2qD1NG22FuUDa17lOM.C8V4xWvGi6wjPK5Yz4IvZtORumRghvy"
};


// rota de login
router.post("/login", async (req, res) => {

  const { email, password } = req.body;


  // verifica email
  if (email !== user.email) {

    saveLog(`Tentativa de login com email inválido: ${email}`);

    return res.status(401).json({
      message: "Usuário inválido"
    });

  }


  // verifica senha
  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );


  if (!passwordMatch) {

    saveLog(`Senha inválida para usuário: ${email}`);
    
    return res.status(401).json({
      message: "Senha inválida"
    });

  }


  // gera código MFA
  mfaCode = Math.floor(
    100000 + Math.random() * 900000
  );


  // envia email
  await sendEmail(

    user.email,

    "Código MFA :D",

    `Seu código MFA é: ${mfaCode}`

  );
  saveLog(`Código MFA enviado para: ${email}`);
  


  res.json({

    message: "Código MFA enviado para o email!! :)",
    mfaRequired: true

  });

});

router.post("/verify-mfa", (req, res) => {

  const { code } = req.body;


  // verifica código MFA
  if (Number(code) !== mfaCode) {

    saveLog(`Código MFA inválido para usuário: ${user.email}`);

    return res.status(401).json({
      message: "Código MFA inválido"
    });

  }


  // gera token JWT após MFA
  const token = jwt.sign(

    { email: user.email },

    process.env.JWT_SECRET,

    { expiresIn: "1h" }

  );


  res.json({

    message: "MFA validado com sucesso!!! :D",
    token

  });

});

module.exports = router;