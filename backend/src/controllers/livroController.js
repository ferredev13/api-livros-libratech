// -----------------------------------------
// Controller de Livros
// Responsável pelo CRUD completo:
// listar, buscar por ID, criar, atualizar e excluir livros.
// -----------------------------------------

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {

  // -----------------------------------------
  // Lista todos os livros cadastrados
  // Método: GET /livros
  // -----------------------------------------
  listarLivros: async (req, res) => {
    try {
      const livros = await prisma.livro.findMany();
      res.json(livros);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar livros" });
    }
  },

  // -----------------------------------------
  // Retorna um livro específico pelo ID
  // Método: GET /livro/:id
  // -----------------------------------------
  getLivro: async (req, res) => {
    const id = Number(req.params.id);

    try {
      const livro = await prisma.livro.findUnique({
        where: { id }
      });

      if (!livro) {
        return res.status(404).json({ error: "Livro não encontrado" });
      }

      res.json(livro);

    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar o livro" });
    }
  },

  // -----------------------------------------
  // Cria um novo livro no sistema
  // Método: POST /livro
  // -----------------------------------------
  criarLivro: async (req, res) => {
    const { isbn, titulo, descricao, genero } = req.body;

    try {
      const novoLivro = await prisma.livro.create({
        data: { isbn, titulo, descricao, genero }
      });

      res.status(201).json(novoLivro);

    } catch (error) {
      res.status(500).json({ error: "Erro ao criar o livro" });
    }
  },

  // -----------------------------------------
  // Atualiza um livro existente pelo ID
  // Método: PUT /livro/:id
  // -----------------------------------------
  atualizarLivro: async (req, res) => {
    const id = Number(req.params.id);
    const { isbn, titulo, descricao, genero } = req.body;

    try {
      const livroAtualizado = await prisma.livro.update({
        where: { id },
        data: { isbn, titulo, descricao, genero }
      });

      res.json(livroAtualizado);

    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar o livro" });
    }
  },

  // -----------------------------------------
  // Exclui um livro pelo ID
  // Método: DELETE /livro/:id
  // -----------------------------------------
  excluirLivro: async (req, res) => {
    const id = Number(req.params.id);

    try {
      await prisma.livro.delete({ where: { id } });
      res.json({ mensagem: "Livro excluído com sucesso" });

    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir o livro" });
    }
  }

};
