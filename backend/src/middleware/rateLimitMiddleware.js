const rateLimit = require("express-rate-limit");


// middleware de proteção contra excesso de requisições
const limiter = rateLimit({

  // tempo da janela
  windowMs: 1 * 60 * 1000,

  // maximo de requisições permitidas
  max: 5,

  // mensagem de erro
  message: {

    message: "Muitas requisições!! Tente novamente em 1 minuto. :)"

  }

});

module.exports = limiter;