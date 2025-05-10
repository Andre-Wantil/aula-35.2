const { Usuario } = require("../models/Usuario");

class RepositorioDeUsuario {
  buscarTodos() {
    return Usuario.buscarTodos();
  }

  criar(usuario) {
    return usuario.salvar();
  }

  pegarPeloEmail(email) {
    return Usuario.pegarPeloEmail(email)
  }
}

module.exports = new RepositorioDeUsuario();
