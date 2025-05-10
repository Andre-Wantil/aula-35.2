const express = require("express");
const controladorDeUsuario = require("../controllers/controladorDeUsuario");
const rotasDeUsuario = express.Router();

rotasDeUsuario.get("/todos", controladorDeUsuario.pegarTodos);
rotasDeUsuario.post("/cadastrar", controladorDeUsuario.cadastrar);
rotasDeUsuario.post("/conectar", controladorDeUsuario.conectar);

module.exports = rotasDeUsuario;
