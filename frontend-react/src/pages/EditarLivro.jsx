import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Logo padrão do sistema
import Logo from "../assets/logotipo.png";

/* ---------------------------------------------------------
   EDITAR LIVRO — Página /livros/editar/:id
   - Mesmo layout da página "Adicionar Livro"
   - Cabeçalho igual ao de "Livros" e "Adicionar Livro"
   - Campos preenchidos automaticamente
   - Após salvar, permanece na página (Regra 2B)
   - Validação simples e simulada
--------------------------------------------------------- */

export default function EditarLivro() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ---------------------------------------------------------
  // Estados do formulário
  // ---------------------------------------------------------
  const [isbn, setIsbn] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [genero, setGenero] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  // ---------------------------------------------------------
  // Simulação de carregamento de dados
  // ---------------------------------------------------------
  useEffect(() => {
    async function loadBook() {
      setLoading(true);

      await new Promise((r) => setTimeout(r, 600));

      const mockData = {
        id,
        isbn: "978-8551003427",
        titulo: "A Jornada do Anel",
        descricao: "Uma aventura épica envolvendo hobbits, elfos e o Um Anel.",
        genero: "Fantasia",
      };

      setIsbn(mockData.isbn);
      setTitulo(mockData.titulo);
      setDescricao(mockData.descricao);
      setGenero(mockData.genero);

      setLoading(false);
    }

    loadBook();
  }, [id]);

  // ---------------------------------------------------------
  // Validação simples
  // ---------------------------------------------------------
  function validate() {
    const e = {};
    if (!isbn.trim()) e.isbn = "ISBN é obrigatório.";
    if (!titulo.trim()) e.titulo = "Título é obrigatório.";
    if (!genero.trim()) e.genero = "Gênero é obrigatório.";
    if (descricao && descricao.trim().length < 10)
      e.descricao = "Descrição deve conter pelo menos 10 caracteres.";
    return e;
  }

  // ---------------------------------------------------------
  // Salvar alterações
  // ---------------------------------------------------------
  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(null);

    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length > 0) return;

    setSaving(true);

    await new Promise((r) => setTimeout(r, 900));

    setSaving(false);
    setSuccess("Alterações salvas com sucesso!");
  }

  // ---------------------------------------------------------
  // LOADING
  // ---------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Carregando dados...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#EEF3F8]">

      {/* ---------------------------------------------------------
         CABEÇALHO PADRONIZADO
      --------------------------------------------------------- */}
      <header className="w-full bg-gradient-to-r from-[#1D3153] to-[#0a58ca] shadow-md py-4 px-6 flex items-center justify-between">

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
          EDITAR LIVRO
        </h1>

        {/* BOTÃO VOLTAR */}
        <button
          onClick={() => navigate("/livros")}
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
         FORMULÁRIO — CARD BRANCO (2 COLUNAS)
      --------------------------------------------------------- */}
      <main className="max-w-[1100px] mx-auto px-6 pb-12 mt-10">
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ---------------------------------------------------------
               COLUNA ESQUERDA
            --------------------------------------------------------- */}
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">ISBN</label>
              <input
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.isbn ? "border-red-400" : "border-gray-200"
                }`}
                placeholder="978-xxxxxxxxxx"
              />
              {errors.isbn && <span className="text-xs text-red-500">{errors.isbn}</span>}

              <label className="text-sm font-medium text-gray-700 mt-3">Título</label>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.titulo ? "border-red-400" : "border-gray-200"
                }`}
                placeholder="Nome do livro"
              />
              {errors.titulo && <span className="text-xs text-red-500">{errors.titulo}</span>}

              <label className="text-sm font-medium text-gray-700 mt-3">Gênero</label>
              <input
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.genero ? "border-red-400" : "border-gray-200"
                }`}
                placeholder="Fantasia, Romance, Tecnologia..."
              />
              {errors.genero && <span className="text-xs text-red-500">{errors.genero}</span>}
            </div>

            {/* ---------------------------------------------------------
               COLUNA DIREITA
            --------------------------------------------------------- */}
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={8}
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.descricao ? "border-red-400" : "border-gray-200"
                }`}
                placeholder="Escreva uma descrição clara do livro..."
              />
              {errors.descricao && (
                <span className="text-xs text-red-500">{errors.descricao}</span>
              )}

              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[#1F78D1] text-white rounded-md hover:brightness-95 transition disabled:opacity-60"
                >
                  {saving ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </div>
          </form>

          {/* ---------------------------------------------------------
             MENSAGEM DE SUCESSO
          --------------------------------------------------------- */}
          {success && (
            <div className="mt-4 text-green-600 text-sm">{success}</div>
          )}
        </div>
      </main>
    </div>
  );
}
