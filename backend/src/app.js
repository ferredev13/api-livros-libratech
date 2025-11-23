// -----------------------------------------
// Configuração principal da aplicação Express
// Responsável por inicializar middlewares globais,
// carregar rotas públicas e protegidas,
// e deixar tudo pronto para o server.js executar.
// -----------------------------------------

const express = require("express");
const cors = require("cors");

// Rotas
const authRoutes = require("./routes/authRoutes");        // /login
const userRoutes = require("./routes/userRoutes");        // /usuarios
const livroRoutes = require("./routes/livroRoutes");      // livros (protegidas)

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// -----------------------------------------
// ROTAS PÚBLICAS
// -----------------------------------------

// Login (gera token JWT)
app.use("/login", authRoutes);

// Registro de usuários (não precisa autenticação)
app.use("/usuarios", userRoutes);  
// => POST /usuarios/register
// => POST /usuarios/change-password (protegido pelo middleware dentro da rota)

// -----------------------------------------
// ROTAS PROTEGIDAS – exigem JWT
// -----------------------------------------

app.use("/", livroRoutes);  
// Todas as rotas dentro de livroRoutes têm authMiddleware

module.exports = app;
