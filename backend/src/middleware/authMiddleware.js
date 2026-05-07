const jwt = require("jsonwebtoken");


//  para verificar se o usuário possui token válido
function authMiddleware(req, res, next) {

  // pega o token enviado no header
  const authHeader = req.headers.authorization;


  // verifica se existe token
  if (!authHeader) {
    return res.status(401).json({
      message: "Token não fornecido!! :/"
    });
  }


  // remove a palavra "Bearer"
  const token = authHeader.split(" ")[1];


  try {

    // verifica se o token é válido
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // salva dados do usuário na requisição
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Token inválido :/"
    });

  }

}

module.exports = authMiddleware;