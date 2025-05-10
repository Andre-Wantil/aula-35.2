const { HttpError } = require("../errors/httpError");
const servicoDeUsuario = require("../services/servicoDeUsuario");

class ControladorDeUsuario {
    pegarTodos(_req, res) {
        const usuarios = servicoDeUsuario.buscarTodos();

        if (usuarios.length === 0) {
            return res
                .status(404)
                .json({ messagem: "Nenhum usuário foi encontrado." });
        }

        res.status(200).json(usuarios);
    }

    cadastrar(req, res) {
        const { nome, email, cpf, senha } = req.body;

        if ((!nome || !email || !cpf, !senha)) {
            return res
                .status(400)
                .json({ messagem: "Todos os campos são obrigatórios." });
        }

        const usuario = servicoDeUsuario.cadastrar(nome, email, cpf, senha);

        res.status(201).json(usuario);
    }

    conectar(req, res) {
        try {
        // Pegar o corpo do req e formatar: email e senha
        const { email, senha } = req.body;

        // Chamar função do service
        const resposta = servicoDeUsuario.conectar(email, senha);
        
        // Se não conseguiu logar devolve um erro
        if (resposta instanceof HttpError) {
          return res.status(resposta.status).json({ mensagem: resposta.message });
        }
        // Caso bata o login, conceder acesso, resposta 200
        res.status(200).json(resposta);
      } catch {
        return res.status(500).json({ error: resposta.error })
      }
    }
}

module.exports = new ControladorDeUsuario();
