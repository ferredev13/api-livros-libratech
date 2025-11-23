import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api";
import Logo from "./assets/logotipo.png";
import "./index.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ---------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------
  const handleLogin = async () => {
    setError("");

    try {
      const response = await axios.post("/login", { email, senha });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.error || "Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1D3153] transition-all">

      {/* ---------------------------------------------------------
         LOGO + TÍTULO
      --------------------------------------------------------- */}
      <div className="flex flex-col items-center mt-10 md:mt-12">

        <img
          src={Logo}
          alt="Logo LibraTech"
          className="w-[275px] md:w-[335px] mb-0"
        />

        {/* TÍTULO usando a mesma fonte futurista do Dashboard */}
        <h1
          className="
            font-audiowide
            text-[30px] md:text-[38px]
            text-white
            tracking-widest
            -mt-[18px]
            mb-6
          "
        >
          LIBRATECH
        </h1>
      </div>

      {/* ---------------------------------------------------------
         CAMPOS DE LOGIN
      --------------------------------------------------------- */}
      <div className="flex flex-col w-[60%] md:w-[35%] max-w-[500px]">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="h-[40px] md:h-[50px] px-4 mb-3 rounded-md bg-gray-300 outline-none"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="h-[40px] md:h-[50px] px-4 mb-1 rounded-md bg-gray-300 outline-none"
        />

        {error && (
          <p className="text-red-400 text-sm mt-1">{error}</p>
        )}
      </div>

      {/* ---------------------------------------------------------
         BOTÕES
      --------------------------------------------------------- */}
      <div className="flex gap-6 mt-4">

        <button
          onClick={handleLogin}
          className="
            bg-[#1F78D1] text-white 
            h-[45px] md:h-[50px]
            w-[135px] md:w-[160px]
            rounded-md text-base md:text-lg
            hover:scale-105 transition-transform
          "
        >
          Login
        </button>

        <button
          onClick={() => navigate("/cadastro")}
          className="
            bg-[#1F78D1] text-white
            h-[45px] md:h-[50px]
            w-[135px] md:w-[160px]
            rounded-md text-base md:text-lg
            hover:scale-105 transition-transform
          "
        >
          Cadastro
        </button>

      </div>

      {/* ---------------------------------------------------------
         RODAPÉ
      --------------------------------------------------------- */}
      <footer
        className="
          w-full text-center text-xs md:text-sm 
          mt-16 md:mt-28 pb-6 text-white
        "
      >
        © 2025 LibraTech — Sistema de Gestão de Livros Desenvolvido por Márcio Ferre
      </footer>

    </div>
  );
}
