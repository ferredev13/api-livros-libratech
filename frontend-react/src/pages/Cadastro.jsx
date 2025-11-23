import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api"; // <-- Integração backend
import Logo from "../assets/logotipo.png";

// ---------------------------------------------------------
// TELA DE CADASTRO
// Envia dados ao backend (POST /usuarios/cadastrar)
// Valida erros e exibe mensagens ao usuário
// ---------------------------------------------------------

export default function Cadastro() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  // Estados dos campos
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Mensagens
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  // ---------------------------------------------------------
  // Função: enviar dados ao backend
  // ---------------------------------------------------------
  const handleCadastro = async () => {
    setErro("");
    setMensagem("");

    try {
      const resposta = await API.post("/usuarios/cadastrar", {
        nome,
        email,
        senha,
        confirmarSenha,
      });

      setMensagem("Conta criada com sucesso!");
      setTimeout(() => navigate("/"), 1500);

    } catch (err) {
      if (err.response) {
        setErro(err.response.data.error);
      } else {
        setErro("Erro ao conectar ao servidor.");
      }
    }
  };

  return (
    <div
      className={`
        min-h-screen flex flex-col items-center 
        ${darkMode ? "bg-[#1D3153]" : "bg-gray-200"}
        transition-all duration-300
      `}
    >
      {/* ---------------------------------------------------------
          SWITCH TOGGLE
      --------------------------------------------------------- */}
      <div className="absolute top-6 right-6 flex flex-col items-center select-none">
        <div
          onClick={() => setDarkMode(!darkMode)}
          className={`
            w-8 h-[18px] rounded-full cursor-pointer 
            flex items-center px-[2px] transition-all duration-300
            ${darkMode ? "bg-[#2E6BFF] shadow-[0_0_10px_#2E6BFF]" : "bg-gray-400"}
          `}
        >
          <div
            className={`
              w-[13px] h-[13px] rounded-full bg-white shadow-md transform transition-all duration-300
              ${darkMode ? "translate-x-4" : "translate-x-0"}
            `}
          ></div>
        </div>

        <span
          className={`
            mt-1 text-[10px] md:text-xs
            ${darkMode ? "text-white" : "text-gray-900"}
          `}
        >
          Alterar Tema
        </span>
      </div>

      {/* ---------------------------------------------------------
          LOGO + TEXTO
      --------------------------------------------------------- */}
      <div className="absolute top-6 left-6 flex flex-col items-start">
        <img
          src={Logo}
          alt="Logo"
          className="w-[95px] md:w-[110px]"
        />

        <span
          className={`
            font-rajdhani font-semibold
            text-[10px] md:text-[12px]
            mt-[-6px]
            ml-1
            ${darkMode ? "text-white" : "text-gray-900"}
          `}
        >
          LIBRATECH
        </span>
      </div>

      {/* ---------------------------------------------------------
          TÍTULO
      --------------------------------------------------------- */}
      <h1
        className={`
          font-rajdhani font-semibold
          text-[28px] md:text-[34px]
          text-center mt-16
          ${darkMode ? "text-white" : "text-gray-900"}
        `}
      >
        Criar Conta
      </h1>

      <p
        className={`
          font-rajdhani text-[15px] md:text-[17px] text-center mb-8
          ${darkMode ? "text-gray-300" : "text-gray-700"}
        `}
      >
        Preencha seus dados para criar sua conta
      </p>

      {/* ---------------------------------------------------------
          CARD DO FORMULÁRIO
      --------------------------------------------------------- */}
      <div
        className={`
          w-[90%] max-w-[600px] 
          bg-white/10 backdrop-blur-md
          border border-white/20
          shadow-lg rounded-xl px-8 py-10
          ${darkMode ? "text-white" : "text-gray-900"}
        `}
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="h-[45px] rounded-md px-4 bg-gray-300 text-gray-700 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[45px] rounded-md px-4 bg-gray-300 text-gray-700 outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="h-[45px] rounded-md px-4 bg-gray-300 text-gray-700 outline-none"
          />

          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="h-[45px] rounded-md px-4 bg-gray-300 text-gray-700 outline-none"
          />
        </div>

        {/* ---------------------------------------------------------
            MENSAGENS
        --------------------------------------------------------- */}
        {erro && (
          <p className="text-red-400 text-center mt-4">{erro}</p>
        )}
        {mensagem && (
          <p className="text-green-300 text-center mt-4">{mensagem}</p>
        )}

        {/* ---------------------------------------------------------
            BOTÕES
        --------------------------------------------------------- */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={handleCadastro}
            className="
              bg-[#1F78D1] text-white 
              h-[45px] w-[160px]
              rounded-md text-base md:text-lg
              hover:scale-105 transition-transform
            "
          >
            Criar Conta
          </button>

          <button
            onClick={() => navigate("/")}
            className="
              bg-[#1F78D1] text-white 
              h-[45px] w-[160px]
              rounded-md text-base md:text-lg
              hover:scale-105 transition-transform
            "
          >
            Voltar
          </button>
        </div>
      </div>

      {/* RODAPÉ */}
      <footer
        className={`
          w-full text-center text-xs md:text-sm pb-4 mt-10
          ${darkMode ? "text-white" : "text-gray-900"}
        `}
      >
        © 2025 LibraTech — Sistema de Gestão de Livros Desenvolvido por Márcio Ferre
      </footer>
    </div>
  );
}
