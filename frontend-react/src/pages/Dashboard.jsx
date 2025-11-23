import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, User, Plus } from "lucide-react";
import Logo from "../assets/logotipo.png";

/*  
  ---------------------------------------------------------
  DASHBOARD — Tela Principal
  Visual futurista, fonte Audiowide, degradê moderno
  ---------------------------------------------------------
*/

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#eef3f8]">

      {/* ---------------------------------------------------------
         CABEÇALHO COM DEGRADÊ FUTURISTA
      --------------------------------------------------------- */}

      <header 
        className="
          w-full 
          bg-gradient-to-r 
          from-[#1D3153] to-[#0a58ca] 
          shadow-md py-3 px-6 flex items-center justify-between">
      

        {/* LOGO + NOME */}
        <div className="flex items-center gap-2 w-14">
          <img src={Logo} alt="Logo" className="w-[70px]" />
          <div className="flex flex-col leading-tight">
            <span className="text-white font-semibold text-sm">LibraTech</span>
            <span className="text-white text-[11px]">Sistema de livros</span>            
          </div>
        </div>

        {/* TÍTULO FUTURISTA */}
        <h1
          className="
            text-white
            text-[40px]
            font-audiowide
            drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]
            tracking-[3px]
          "
        >
          DASHBOARD
        </h1>

        {/* BOTÃO SAIR */}
        <button
          onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
          className="
           bg-white text-[#1D3153] font-semibold
            px-4 py-1 rounded-md shadow
           hover:bg-gray-200 transition
          "
        >
        Sair
        </button>

      </header>

      {/* ---------------------------------------------------------
         GRID DE CARDS — CENTRALIZADO
      --------------------------------------------------------- */}
      <div className="mt-16 flex justify-center gap-14">

        {/* CARD — LIVROS */}
        <div
          onClick={() => navigate("/livros")}
          className="
            w-[260px] h-[150px]
            bg-white shadow-lg rounded-xl
            p-6 cursor-pointer hover:scale-105 transition
            flex flex-col justify-center
          "
        >
          <BookOpen size={34} className="text-blue-600 mb-3" />
          <span className="font-semibold text-lg text-gray-800">Livros</span>
          <span className="text-gray-500 text-sm">
            Gerenciamento de registros
          </span>
        </div>

        {/* CARD — PERFIL */}
        <div
          onClick={() => navigate("/perfil")}
          className="
            w-[260px] h-[150px]
            bg-white shadow-lg rounded-xl
            p-6 cursor-pointer hover:scale-105 transition
            flex flex-col justify-center
          "
        >
          <User size={34} className="text-blue-600 mb-3" />
          <span className="font-semibold text-lg text-gray-800">Perfil</span>
          <span className="text-gray-500 text-sm">
            Configurações da conta
          </span>
        </div>

        {/* CARD — EM BREVE */}
        <div
          className="
            w-[260px] h-[150px]
            bg-white shadow-lg rounded-xl
            p-6 flex flex-col justify-center
          "
        >
          <Plus size={34} className="text-blue-600 mb-3" />
          <span className="font-semibold text-lg text-gray-800">Em breve</span>
          <span className="text-gray-500 text-sm">
            Novas funcionalidades serão adicionadas
          </span>
        </div>
      </div>
    </div>
  );
}
