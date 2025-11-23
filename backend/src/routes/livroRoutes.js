// -----------------------------------------
// Rotas de Livros
// Responsável por mapear todas as rotas de CRUD
// de livros e aplicar autenticação via middleware JWT.
// -----------------------------------------

const express = require("express");
const router = express.Router();

const livroController = require("../controllers/livroController");
const authMiddleware = require("../middleware/authMiddleware");

// -----------------------------------------
// Lista todos os livros
// Método: GET /livros
// Protegido por autenticação
// -----------------------------------------
router.get("/livros", authMiddleware, livroController.listarLivros);

// -----------------------------------------
// Busca um livro pelo ID
// Método: GET /livro/:id
// Protegido por autenticação
// -----------------------------------------
router.get("/livro/:id", authMiddleware, livroController.getLivro);

// -----------------------------------------
// Cria um novo livro
// Método: POST /livro
// Protegido por autenticação
// -----------------------------------------
router.post("/livro", authMiddleware, livroController.criarLivro);

// -----------------------------------------
// Atualiza um livro existente pelo ID
// Método: PUT /livro/:id
// Protegido por autenticação
// -----------------------------------------
router.put("/livro/:id", authMiddleware, livroController.atualizarLivro);

// -----------------------------------------
// Exclui um livro pelo ID
// Método: DELETE /livro/:id
// Protegido por autenticação
// -----------------------------------------
router.delete("/livro/:id", authMiddleware, livroController.excluirLivro);

module.exports = router; // Exporta as rotas para uso no app.js
