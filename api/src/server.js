const express = require("express");
const rotas = require("./routes");
const server = express();

server.use(express.json());

server.use(rotas);

server.use((_req, res, _next) =>
  res.status(404).json({ erro: "Rota não existe" })
);

server.listen(3000, () => console.log("Servidor está rodando! E a minha dor não acaba!!!!!!!!!"));
