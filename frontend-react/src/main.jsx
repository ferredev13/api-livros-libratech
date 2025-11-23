import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// -----------------------------------------
// Importação das telas
// -----------------------------------------
import App from "./App.jsx";                             // Login
import Cadastro from "./pages/Cadastro.jsx";             // Cadastro
import Dashboard from "./pages/Dashboard.jsx";           // Dashboard
import Livros from "./pages/Livros.jsx";                 // CRUD de Livros
import AdicionarLivro from "./pages/AdicionarLivro.jsx"; // Inserir Livro
import EditarLivro from "./pages/EditarLivro.jsx";       // Editar Livro
import Perfil from "./pages/Perfil.jsx";                 // Tela de Perfil

// -----------------------------------------
// Contexto global — Tema Dark/Light
// -----------------------------------------
import { ThemeProvider } from "./context/ThemeContext";

import "./index.css";

// -----------------------------------------
// Renderização principal da aplicação
// Agora com ThemeProvider envolvendo tudo
// -----------------------------------------
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<App />} />

        {/* CADASTRO */}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* LIVROS */}
        <Route path="/livros" element={<Livros />} />

        {/* ADICIONAR LIVRO */}
        <Route path="/livros/novo" element={<AdicionarLivro />} />

        {/* EDITAR LIVRO */}
        <Route path="/livros/editar/:id" element={<EditarLivro />} />

        {/* PERFIL */}
        <Route path="/perfil" element={<Perfil />} />

      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
