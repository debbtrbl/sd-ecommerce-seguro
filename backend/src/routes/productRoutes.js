const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// rota protegida (passa pelo middleware de autenticacao)
router.get(
  "/products",
  authMiddleware,

  (req, res) => {

    res.json({

      message: "Acesso autorizado!! :D",

      user: req.user,

      products: [
        {
          id: 1,
          name: "Notebook Gamer",
          price: 4500
        },

        {
          id: 2,
          name: "Mouse RGB",
          price: 150
        },
        {
          id: 3,
          name: "Headset gatinho",
          price: 400
        },
        {id: 4,
          name: "Teclado Gamer",
          price: 300
        },
      ]

    });

  }
);

module.exports = router;