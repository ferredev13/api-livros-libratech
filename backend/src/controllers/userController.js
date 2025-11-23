// ---------------------------------------------------------
// Controller de Usuário
// Responsável por:
// - Registrar novo usuário (registro)
// - Alterar senha (change password)
// ---------------------------------------------------------

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");

// Configurações de segurança
const SALT_ROUNDS = 10;

module.exports = {
  // ---------------------------------------------------------
  // register
  // - Recebe: { nome, email, senha, senhaConfirm }
  // - Valida dados, checa duplicidade de email,
  //   cria hash e insere no banco.
  // ---------------------------------------------------------
  register: async (req, res) => {
    const { nome, email, senha, senhaConfirm } = req.body;

    try {
      // validações simples
      if (!nome || !email || !senha || !senhaConfirm) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes" });
      }

      if (senha !== senhaConfirm) {
        return res.status(400).json({ error: "As senhas não conferem" });
      }

      // checa se já existe email
      const existing = await prisma.Usuario.findUnique({ where: { email } });
      if (existing) {
        return res.status(409).json({ error: "Email já cadastrado" });
      }

      // hash da senha
      const hash = await bcrypt.hash(senha, SALT_ROUNDS);

      // cria usuário
      const user = await prisma.Usuario.create({
        data: {
          nome,
          email,
          senhaHash: hash
        },
        select: { id: true, nome: true, email: true, criadoEm: true }
      });

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user
      });

    } catch (error) {
      return res.status(500).json({
        error: "Erro ao criar usuário",
        detalhe: error.message
      });
    }
  },

  // ---------------------------------------------------------
  // changePassword
  // - Rota protegida (precisa de authMiddleware)
  // - Recebe: { senhaAtual, novaSenha, novaSenhaConfirm }
  // - Valida senhaAtual, verifica novaSenha == confirm, atualiza hash
  // ---------------------------------------------------------
  changePassword: async (req, res) => {
    const userId = req.user?.id; // authMiddleware deve popular req.user
    const { senhaAtual, novaSenha, novaSenhaConfirm } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    try {
      if (!senhaAtual || !novaSenha || !novaSenhaConfirm) {
        return res.status(400).json({ error: "Campos obrigatórios ausentes" });
      }

      if (novaSenha !== novaSenhaConfirm) {
        return res.status(400).json({ error: "A nova senha e confirmação não conferem" });
      }

      // busca usuário
      const user = await prisma.Usuario.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // compara senha atual
      const ok = await bcrypt.compare(senhaAtual, user.senhaHash);
      if (!ok) {
        return res.status(401).json({ error: "Senha atual incorreta" });
      }

      // atualiza a senha
      const newHash = await bcrypt.hash(novaSenha, SALT_ROUNDS);
      await prisma.Usuario.update({
        where: { id: userId },
        data: { senhaHash: newHash }
      });

      return res.json({ message: "Senha atualizada com sucesso" });

    } catch (error) {
      return res.status(500).json({
        error: "Erro ao alterar senha",
        detalhe: error.message
      });
    }
  }
};
