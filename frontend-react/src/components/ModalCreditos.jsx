import React from "react";

// ---------------------------------------------------------
// MODAL DE CRÉDITOS — LibraTech
// - Componente reutilizável
// - Abre sobre qualquer tela
// - Fundo escuro + glass
// - Layout minimalista e elegante
// ---------------------------------------------------------

export default function ModalCreditos({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

      {/* ---------------------------------------------------------
         CARD DO MODAL
      --------------------------------------------------------- */}
      <div className="w-full max-w-[450px] bg-white/90 backdrop-blur rounded-xl shadow-xl p-6">

        {/* Título */}
        <h2 className="text-xl font-semibold text-center text-[#1F2937] mb-2">
          LibraTech
        </h2>

        {/* Subtítulo */}
        <p className="text-center text-sm text-gray-600 mb-6">
          Sistema de Gestão de Livros
        </p>

        {/* ---------------------------------------------------------
           CONTEÚDOS
        --------------------------------------------------------- */}
        <div className="space-y-3 text-center">

          <p className="text-gray-700 text-sm">
            <strong>Desenvolvido por:</strong><br />
            Márcio Ferre
          </p>

          <p className="text-gray-700 text-sm">
            <strong>Tecnologias:</strong><br />
            React • TailwindCSS • Vite
          </p>

          <p className="text-gray-700 text-sm">
            <strong>Versão:</strong> 1.0.0
          </p>

          <p className="text-gray-500 text-xs">
            © 2025 LibraTech — Todos os direitos reservados.
          </p>
        </div>

        {/* ---------------------------------------------------------
           BOTÃO FECHAR
        --------------------------------------------------------- */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1F78D1] text-white rounded-md hover:brightness-110 transition"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
