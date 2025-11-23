import React from "react";

// ---------------------------------------------------------
// MODAL DETALHES DO LIVRO — Componente Reutilizável
// - Glass leve no fundo
// - Card em branco sólido
// - Mostra todas as informações do livro
// - Botões: Editar / Fechar
// ---------------------------------------------------------

export default function ModalDetalhesLivro({ livro, onClose, onEdit }) {
  if (!livro) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      {/* ---------------------------------------------------------
         CARD PRINCIPAL
      --------------------------------------------------------- */}
      <div className="w-full max-w-[650px] bg-white rounded-xl shadow-lg p-6">

        {/* ---------------------------------------------------------
           CABEÇALHO DO MODAL
        --------------------------------------------------------- */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#1F2937]">
              {livro.titulo}
            </h2>
            <p className="text-sm text-gray-500">{livro.genero}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit && onEdit(livro.id)}
              className="px-3 py-1 rounded-md bg-yellow-100 hover:bg-yellow-200 text-sm"
            >
              ✏ Editar
            </button>

            <button
              onClick={onClose}
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
            >
              Fechar
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------
           INFORMAÇÕES DO LIVRO
        --------------------------------------------------------- */}
        <div className="mt-5">
          <div className="mb-3">
            <span className="font-medium text-gray-700">ISBN:</span>{" "}
            <span className="text-gray-600">{livro.isbn || "-"}</span>
          </div>

          <div className="mb-3">
            <span className="font-medium text-gray-700">Descrição:</span>
            <p className="text-gray-600 text-sm mt-1 whitespace-pre-wrap">
              {livro.descricao || "—"}
            </p>
          </div>

          <div className="mb-3">
            <span className="font-medium text-gray-700">Criado em:</span>{" "}
            <span className="text-gray-600">{livro.criadoEm || "-"}</span>
          </div>

          <div>
            <span className="font-medium text-gray-700">Atualizado em:</span>{" "}
            <span className="text-gray-600">{livro.atualizadoEm || "—"}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
