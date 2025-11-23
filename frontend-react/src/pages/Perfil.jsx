import React, { useState, useContext, useEffect } from "react";
import Logo from "../assets/logotipo.png";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

/*
  ---------------------------------------------------------
  TELA DE PERFIL — Revisada e COMPLETA
  - Aba lateral: Perfil / Segurança / Preferências / Créditos
  - Logo igual ao Dashboard
  - Tema dinâmico via ThemeContext
  - Nome + Email vindos do token JWT
  - Alteração de senha (rota protegida)
  - Botão Voltar para Dashboard
  ---------------------------------------------------------
*/

export default function Perfil() {
  const [aba, setAba] = useState("perfil");
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  // Campos da troca de senha
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [novaSenhaConfirm, setNovaSenhaConfirm] = useState("");

  // ---------------------------------------------------------
  // Carregar dados do usuário via token
  // ---------------------------------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setEmail(decoded.email || "");
      setNome(decoded.nome || "");
    } catch (err) {
      console.log("Erro ao decodificar token:", err);
    }
  }, []);

  // ---------------------------------------------------------
  // Alterar senha — integração com backend
  // ---------------------------------------------------------
  async function handleChangePassword() {
    if (!senhaAtual || !novaSenha || !novaSenhaConfirm) {
      return alert("Preencha todos os campos.");
    }

    if (novaSenha !== novaSenhaConfirm) {
      return alert("A nova senha e a confirmação não conferem.");
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/usuarios/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senhaAtual,
          novaSenha,
          novaSenhaConfirm,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return alert(data.error || "Erro ao alterar senha.");
      }

      alert("Senha alterada com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
      setNovaSenhaConfirm("");

    } catch (err) {
      alert("Erro ao conectar ao servidor.");
    }
  }

  // ---------------------------------------------------------
  // Estilos utilitários
  // ---------------------------------------------------------
  const corTexto = darkMode ? "text-white" : "text-gray-900";
  const bgPagina = darkMode ? "bg-[#0F1A2C]" : "bg-gray-100";
  const bgCard = darkMode ? "bg-[#13233B]" : "bg-white";

  return (
    <div className={`min-h-screen ${bgPagina} transition-all`}>

      {/* ---------------------------------------------------------
         CABEÇALHO COM LOGO + VOLTAR
      --------------------------------------------------------- */}
      <header className="w-full bg-gradient-to-r from-[#1D3153] to-[#0a58ca] shadow-md py-2 px-6 flex items-center justify-between">

        {/* Logo + texto */}
        <div className="flex items-center gap-2 w-14">
          <img src={Logo} alt="Logo" className="w-[60px]" />

          <div className="flex flex-col leading-tight">
            <span className="text-white font-semibold text-sm">LibraTech</span>
            <span className="text-white text-[11px]">Sistema de livros</span>
          </div>
        </div>

        {/* Título da página */}
        <h1 className="font-audiowide text-white text-xl tracking-wider">
          PERFIL
        </h1>

        {/* Botão Voltar */}
        <button
          onClick={() => navigate("/dashboard")}
          className="text-white bg-[#0d6efd] px-4 py-1 rounded-md hover:bg-blue-700 transition"
        >
          Voltar
        </button>
      </header>

      {/* ---------------------------------------------------------
         CONTEÚDO PRINCIPAL
      --------------------------------------------------------- */}
      <div className="flex max-w-5xl mx-auto py-10 gap-6">

        {/* MENU LATERAL */}
        <aside className={`w-60 p-4 rounded-lg shadow-md ${bgCard} ${corTexto}`}>
          <ul className="flex flex-col gap-3 text-sm">

            <li
              className={`cursor-pointer p-2 rounded-md ${
                aba === "perfil" ? "bg-blue-600 text-white" : "hover:bg-gray-300/20"
              }`}
              onClick={() => setAba("perfil")}
            >
              Perfil
            </li>

            <li
              className={`cursor-pointer p-2 rounded-md ${
                aba === "seguranca" ? "bg-blue-600 text-white" : "hover:bg-gray-300/20"
              }`}
              onClick={() => setAba("seguranca")}
            >
              Segurança
            </li>

            <li
              className={`cursor-pointer p-2 rounded-md ${
                aba === "preferencias" ? "bg-blue-600 text-white" : "hover:bg-gray-300/20"
              }`}
              onClick={() => setAba("preferencias")}
            >
              Preferências
            </li>

            <li
              className={`cursor-pointer p-2 rounded-md ${
                aba === "creditos" ? "bg-blue-600 text-white" : "hover:bg-gray-300/20"
              }`}
              onClick={() => setAba("creditos")}
            >
              Créditos
            </li>

          </ul>
        </aside>

        {/* ---------------------------------------------------------
           ÁREA DE CONTEÚDO POR ABA
        --------------------------------------------------------- */}
        <section className={`flex-1 p-6 rounded-lg shadow-md ${bgCard} ${corTexto}`}>

          {/* ABA PERFIL */}
          {aba === "perfil" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Informações da Conta</h2>

              <p><strong>Nome:</strong> {nome}</p>
              <p className="mt-2"><strong>Email:</strong> {email}</p>
            </div>
          )}

          {/* ABA SEGURANÇA */}
          {aba === "seguranca" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Alterar Senha</h2>

              <div className="flex flex-col gap-4 w-full max-w-md">

                <input
                  type="password"
                  placeholder="Senha atual"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  className="px-4 py-2 rounded-md bg-gray-300 text-gray-900"
                />

                <input
                  type="password"
                  placeholder="Nova senha"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  className="px-4 py-2 rounded-md bg-gray-300 text-gray-900"
                />

                <input
                  type="password"
                  placeholder="Confirmar nova senha"
                  value={novaSenhaConfirm}
                  onChange={(e) => setNovaSenhaConfirm(e.target.value)}
                  className="px-4 py-2 rounded-md bg-gray-300 text-gray-900"
                />

                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Atualizar Senha
                </button>

              </div>

            </div>
          )}

          {/* ABA PREFERÊNCIAS */}
          {aba === "preferencias" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Preferências</h2>

              <div className="flex items-center gap-3 mt-3">
                <label className="text-sm">Tema escuro:</label>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* ABA CRÉDITOS */}
          {aba === "creditos" && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Créditos</h2>

              <p>Sistema desenvolvido por <strong>Márcio Ferre</strong></p>

              <div className="mt-4 text-sm opacity-80">
                <p>Versão do aplicativo: <strong>1.0.0</strong></p>
                <p>Frontend: React + Vite + Tailwind</p>
                <p>Backend: Node.js + Express + Prisma</p>
                <p>Banco de dados: MySQL</p>
              </div>
            </div>
          )}

        </section>
      </div>
    </div>
  );
}
