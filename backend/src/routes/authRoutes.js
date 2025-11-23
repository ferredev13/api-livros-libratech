// -----------------------------------------
// Rotas de autenticação
// Responsável por direcionar as requisições de login
// para o controller apropriado.
// -----------------------------------------

const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// -----------------------------------------
// Rota pública de login
// Método: POST
// Descrição: Recebe usuário e senha e retorna um token JWT
// -----------------------------------------
router.post("/", authController.login);

module.exports = router; // Exporta rotas para serem usadas no app.js
