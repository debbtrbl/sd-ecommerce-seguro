const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const promBundle = require("express-prom-bundle");
const client = require("prom-client");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const limiter = require("./middleware/rateLimitMiddleware");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();


const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  promClient: {
    collectDefaultMetrics: {}
  }
});

app.use(cors());
app.use(helmet());
app.use(express.json());


app.use(metricsMiddleware);

app.use(limiter);

app.use("/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", paymentRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "API de segurança do e-commerce funcionando"
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});