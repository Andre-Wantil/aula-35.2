const bcrypt = require("bcrypt");
const usuarios = [
  {
    id: "7qnptt5s",
    nome: "Ada Lovelace",
    email: "ada@lovelace.com",
    cpf: "34455611223",
    senha: "hpLovelace321"
  },
  {
    id: "5vny7uxn",
    nome: "Alan Turing",
    email: "alan@turing.com",
    cpf: "11223344556",
    senha: "testeDeTuring123"
  }
];

class Usuario {
  constructor(nome, email, cpf, senhaHash) {
    this.id = Math.random().toString(36).substring(2, 10);
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.senha = senhaHash;
  }

  static buscarTodos() {
    return usuarios;
  }

  static pegarPeloEmail(email) {
    return usuarios.find((usuario) => usuario.email === email);
  }

  salvar() {
    usuarios.push(this);
    return this;
  }

  static async criptografar(senha) {
    return await bcrypt.hash(senha, 10);
  }

  async compararSenha(senha) {
    return await bcrypt.compare(senha, this.senha);
  }
}

module.exports = { Usuario };
