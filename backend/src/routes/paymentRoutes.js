const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  encryptData,
  decryptData

} = require("../utils/crypto");

const router = express.Router();


// rota protegida de pagamento
router.post(

  "/payment",

  authMiddleware,

  (req, res) => {

    const { cardNumber } = req.body;


    // criptografa o cartão
    const encryptedCard = encryptData(cardNumber);


    // simulação de armazenamento seguro
    console.log("Cartão criptografado:");
    console.log(encryptedCard);


    // descriptografa apenas para demonstração
    const decryptedCard = decryptData(
      encryptedCard
    );


    res.json({

      message: "Pagamento processado com segurança! :D",

      encryptedCard,

      decryptedCard

    });

  }

);

module.exports = router;