import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../assets/logotipo.png";

// Componentes externos
import ModalDetalhesLivro from "../components/ModalDetalhesLivro.jsx";
import ModalCreditos from "../components/ModalCreditos.jsx";

/* ---------------------------------------------------------
   LIVROS (CRUD) — Tela revisada
   - Cabeçalho igual ao Dashboard
   - Botão VOLTAR para Dashboard
   - Lista, busca, filtros, paginação
   - Modais externos mantidos
--------------------------------------------------------- */

export default function Livros() {
  const navigate = useNavigate();

  // ---------------------------------------------------------
  // MOCK TEMPORÁRIO (depois substituir pelo backend)
  // ---------------------------------------------------------
  const initialData = [
    {
      id: 1,
      isbn: "978-8551003427",
      titulo: "A Jornada do Anel",
      descricao: "Uma viagem épica pelo mundo fantástico.",
      genero: "Fantasia",
      criadoEm: "2025-02-01 14:20",
      atualizadoEm: "2025-02-03 09:12",
    },
    {
      id: 2,
      isbn: "978-8532512060",
      titulo: "Aprendendo React",
      descricao: "Guia prático para desenvolvimento moderno.",
      genero: "Tecnologia",
      criadoEm: "2025-02-05 10:00",
      atualizadoEm: "2025-02-07 11:00",
    },
  ];

  // ---------------------------------------------------------
  // STATES
  // ---------------------------------------------------------
  const [data, setData] = useState(initialData);
  const [query, setQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const [detailBook, setDetailBook] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showCreditos, setShowCreditos] = useState(false);

  // ---------------------------------------------------------
  // BUSCA + FILTRO + PAGINAÇÃO
  // ---------------------------------------------------------
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return data.filter((r) => {
      const matchQuery =
        !q ||
        r.titulo.toLowerCase().includes(q) ||
        (r.isbn || "").toLowerCase().includes(q) ||
        (r.genero || "").toLowerCase().includes(q);

      const matchGenre = !genreFilter || r.genero === genreFilter;

      return matchQuery && matchGenre;
    });
  }, [data, query, genreFilter]);

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  // ---------------------------------------------------------
  // CRUD OPERATIONS
  // ---------------------------------------------------------
  const openDetail = (livro) => setDetailBook(livro);

  const handleEdit = (id) => navigate(`/livros/editar/${id}`);

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    setConfirmDelete(null);
  };

  const handleAdd = () => navigate("/livros/novo");

  // ---------------------------------------------------------
  // GÊNEROS UNICOS
  // ---------------------------------------------------------
  const genres = useMemo(() => {
    const unique = new Set(data.map((d) => d.genero).filter(Boolean));
    return Array.from(unique);
  }, [data]);

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#EEF3F8]">

      {/* ---------------------------------------------------------
         CABEÇALHO —
      --------------------------------------------------------- */}
      <header className="w-full bg-gradient-to-r from-[#1D3153] to-[#0a58ca] shadow-md py-3 px-6 flex items-center justify-between">

        {/* LOGO + TEXTO */}
        <div className="flex items-center gap-2 w-14">
          <img src={Logo} alt="Logo" className="w-[60px]" />

          <div className="flex flex-col leading-tight">
            <span className="text-white font-semibold text-sm">LibraTech</span>
            <span className="text-white text-[11px]">Sistema de livros</span>
          </div>
        </div>

        {/* TÍTULO CENTRALIZADO */}
        <h1 className="font-audiowide text-white text-2xl tracking-widest">
          LIVROS
        </h1>

        {/* BOTÃO VOLTAR */}
        <button
          onClick={() => navigate("/dashboard")}
          className="
            bg-white text-[#1D3153] font-semibold
            px-4 py-1 rounded-md shadow
            hover:bg-gray-200 transition
          "
        >
          Voltar
        </button>
      </header>

      {/* ---------------------------------------------------------
         CONTEÚDO
      --------------------------------------------------------- */}
      <main className="max-w-[1200px] mx-auto px-6 pb-12">

        {/* BOTÃO + NOVO (RESTAURADO) */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleAdd}
            className="
              bg-[#1D3153] text-white
              px-4 py-2 rounded-md shadow
              hover:bg-[#0f2340] transition
            "
          >
            + Novo
          </button>
        </div>

        {/* BUSCA + FILTROS */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 mb-6">

          <div className="flex items-center gap-3 w-full md:w-[60%]">
            <input
              placeholder="Pesquisar por título, ISBN ou gênero..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="w-full md:w-[70%] px-4 py-2 rounded-md border border-gray-300 bg-white"
            />

            <select
              value={genreFilter}
              onChange={(e) => {
                setGenreFilter(e.target.value);
                setPage(1);
              }}
              className="px-3 py-2 rounded-md border bg-white border-gray-300"
            >
              <option value="">Todos gêneros</option>
              {genres.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-600">
            {filtered.length} resultado(s)
          </div>
        </div>

        {/* ---------------------------------------------------------
           TABELA
        --------------------------------------------------------- */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Título</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ISBN</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Gênero</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Inserido em</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Ações</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y">
              {pageItems.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-500">
                    Nenhum livro encontrado.
                  </td>
                </tr>
              )}

              {pageItems.map((livro) => (
                <tr key={livro.id} className="hover:bg-gray-50">

                  <td className="px-4 py-3 text-sm">{livro.id}</td>

                  <td className="px-4 py-3">
                    <div className="font-semibold">{livro.titulo}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">
                      {livro.descricao}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-sm">{livro.isbn}</td>
                  <td className="px-4 py-3 text-sm">{livro.genero}</td>
                  <td className="px-4 py-3 text-sm">{livro.criadoEm}</td>

                  <td className="px-4 py-3 text-sm text-right">
                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() => openDetail(livro)}
                        className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
                      >
                        👁 Ver
                      </button>

                      <button
                        onClick={() => handleEdit(livro.id)}
                        className="px-3 py-1 rounded-md bg-yellow-100 hover:bg-yellow-200 text-sm"
                      >
                        ✏ Editar
                      </button>

                      <button
                        onClick={() => setConfirmDelete(livro)}
                        className="px-3 py-1 rounded-md bg-red-100 hover:bg-red-200 text-sm"
                      >
                        🗑 Excluir
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINAÇÃO */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Página {page} de {totalPages}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 rounded-md bg-white border"
            >
              Anterior
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded-md bg-white border"
            >
              Próxima
            </button>
          </div>
        </div>

        {/* MODAL DETALHES */}
        <ModalDetalhesLivro
          livro={detailBook}
          onClose={() => setDetailBook(null)}
          onEdit={(id) => navigate(`/livros/editar/${id}`)}
        />

        {/* MODAL EXCLUSÃO */}
        {confirmDelete && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">

            <div className="w-[90%] md:w-[420px] bg-white rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold">Confirmar exclusão</h3>

              <p className="mt-2 text-sm text-gray-600">
                Tem certeza que deseja excluir o livro{" "}
                <strong>{confirmDelete.titulo}</strong>?
              </p>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-3 py-1 bg-gray-100 rounded-md"
                >
                  Cancelar
                </button>

                <button
                  onClick={() => handleDelete(confirmDelete.id)}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded-md"
                >
                  Excluir
                </button>
              </div>
            </div>

          </div>
        )}

        {/* MODAL CRÉDITOS (AINDA EXISTE, MAS SEM BOTÃO NO HEADER) */}
        <ModalCreditos
          open={showCreditos}
          onClose={() => setShowCreditos(false)}
        />

      </main>
    </div>
  );
}
