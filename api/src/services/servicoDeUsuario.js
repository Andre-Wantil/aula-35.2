const { Usuario } = require("../models/Usuario");
const RepositorioDeUsuario = require("../repositories/repositorioDeUsuario");
const jwt = require("jsonwebtoken");
const z = require("zod");
const { HttpError } = require("../errors/httpError");

class ServicoDeUsuario {
  buscarTodos() {
    return RepositorioDeUsuario.buscarTodos();
  }

  cadastrar(nome, email, cpf, senha) {
    const usuarioSchema = z.object({
      nome: z.string({ required_error: "O nome é obrigatório, e tem que ser uma string" }).trim().min(3),
      email: z.string().email({ message: "O email não é válido" }),
      cpf: z.string().trim().min(11),
      senha: z.string().trim().min(8)
    });

    const validação = usuarioSchema.safeParse({ nome, email, cpf, senha })

    if (!validação.success) {
      return validação.error.format();
    }

    const usuario = new Usuario(nome, email, cpf, senha);
    return RepositorioDeUsuario.criar(usuario);
  }

  conectar(email, senha) {
    // Verifica se usuário existe
    const usuarioExistente = RepositorioDeUsuario.pegarPeloEmail(email);
    // Retorna um erro se o usuário não existir
    if (!usuarioExistente) {
      throw new HttpError(404, "Usuário inexistente");
    }

    // Verifica a senha
    const autenticado = usuarioExistente.compararSenha(senha);
    // Caso contrário, não é autenticado, retorna um erro
    if (!autenticado) {
      throw new HttpError(401, "Senha incorreta");
    }

    // Gera o token, salva, e retorna o usuário
    jwt.sign({ id: usuarioExistente.id }, "elamedeixousemnadamelargouporoutromartasuaingrata", { expiresIn: "1d" })
    // Retorna o token
  }
}

module.exports = new ServicoDeUsuario();
