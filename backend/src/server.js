const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const limiter = require("./middleware/rateLimitMiddleware");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(limiter);

app.use("/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", paymentRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "API de segurança do e-commerce funcionando"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});