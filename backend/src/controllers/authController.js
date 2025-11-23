// ---------------------------------------------------------
// Controller de Autenticação
// Responsável por validar email + senha,
// gerar token JWT e retornar ao cliente.
// ---------------------------------------------------------

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

  // ---------------------------------------------------------
  // Método: login
  // Descrição:
  // - Recebe email e senha
  // - Valida credenciais
  // - Retorna token JWT
  // ---------------------------------------------------------
  login: async (req, res) => {
    const { email, senha } = req.body;

    try {
      // -------------------------------------------
      // Busca usuário pelo email
      // -------------------------------------------
      const user = await prisma.Usuario.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(401).json({ error: "Email não encontrado" });
      }

      // -------------------------------------------
      // Verifica senha
      // -------------------------------------------
      const senhaValida = await bcrypt.compare(senha, user.senhaHash);

      if (!senhaValida) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      // -------------------------------------------
      // Gera token JWT
      // -------------------------------------------
      const token = jwt.sign(
        { id: user.id, email: user.email, nome: user.nome },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Login realizado com sucesso",
        token
      });

    } catch (error) {
      return res.status(500).json({
        error: "Erro interno ao realizar login",
        detalhe: error.message
      });
    }
  }
};
