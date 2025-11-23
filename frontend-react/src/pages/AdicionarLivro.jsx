import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Logo igual à tela LIVROS
import Logo from "../assets/logotipo.png";

/* ---------------------------------------------------------
   ADICIONAR LIVRO — Página /livros/novo
   - Cabeçalho padronizado igual ao da tela "Livros"
   - Layout 2 colunas
   - Card branco sobre fundo #EEF3F8
   - Validações básicas no cliente
--------------------------------------------------------- */

export default function AdicionarLivro() {
  const navigate = useNavigate();

  // ---------------------------------------------------------
  // form state
  // ---------------------------------------------------------
  const [isbn, setIsbn] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [genero, setGenero] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  // ---------------------------------------------------------
  // validação simples (client-side)
  // ---------------------------------------------------------
  function validate() {
    const e = {};
    if (!isbn.trim()) e.isbn = "ISBN é obrigatório";
    if (!titulo.trim()) e.titulo = "Título é obrigatório";
    if (!genero.trim()) e.genero = "Gênero é obrigatório";

    if (descricao && descricao.trim().length > 0 && descricao.trim().length < 10) {
      e.descricao = "Descrição precisa ter ao menos 10 caracteres";
    }

    return e;
  }

  // ---------------------------------------------------------
  // simula envio para backend (substituir por fetch/axios depois)
  // ---------------------------------------------------------
  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(null);

    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length > 0) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));

    const novo = {
      id: Math.floor(Math.random() * 10000) + 10,
      isbn: isbn.trim(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      genero: genero.trim(),
      criadoEm: new Date().toLocaleString(),
      atualizadoEm: null,
    };

    // Aqui você chamaria a API real:
    // await fetch("/api/livros", { method: "POST", body: JSON.stringify(novo) });

    setSubmitting(false);
    setSuccess("Livro criado com sucesso!");

    setIsbn("");
    setTitulo("");
    setDescricao("");
    setGenero("");

    setTimeout(() => navigate("/livros"), 1200);
  }

  return (
    <div className="min-h-screen w-full bg-[#EEF3F8]">

      {/* ---------------------------------------------------------
         CABEÇALHO (IGUAL TELA DE LIVROS)
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
          ADICIONAR LIVRO
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
         MAIN — CARD BRANCO SÓLIDO (LAYOUT 2 COLUNAS)
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
                onChange={(ev) => setIsbn(ev.target.value)}
                placeholder="978-xxxxxxxxx"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.isbn ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.isbn && <div className="text-xs text-red-500">{errors.isbn}</div>}

              <label className="text-sm font-medium text-gray-700 mt-3">Título</label>
              <input
                value={titulo}
                onChange={(ev) => setTitulo(ev.target.value)}
                placeholder="Título do livro"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.titulo ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.titulo && <div className="text-xs text-red-500">{errors.titulo}</div>}

              <label className="text-sm font-medium text-gray-700 mt-3">Gênero</label>
              <input
                value={genero}
                onChange={(ev) => setGenero(ev.target.value)}
                placeholder="Ex: Fantasia, Tecnologia, Romance"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.genero ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.genero && <div className="text-xs text-red-500">{errors.genero}</div>}
            </div>

            {/* ---------------------------------------------------------
               COLUNA DIREITA
            --------------------------------------------------------- */}
            <div className="flex flex-col gap-4">
              <label className="text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                value={descricao}
                onChange={(ev) => setDescricao(ev.target.value)}
                placeholder="Descrição (mínimo 10 caracteres recomendado)"
                rows={8}
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.descricao ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.descricao && <div className="text-xs text-red-500">{errors.descricao}</div>}

              <div className="flex items-end justify-end mt-4">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/livros")}
                    className="px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition"
                    disabled={submitting}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-[#1F78D1] text-white hover:brightness-95 transition disabled:opacity-60"
                    disabled={submitting}
                  >
                    {submitting ? "Salvando..." : "Criar Livro"}
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* ---------------------------------------------------------
             MENSAGEM DE SUCESSO / ERRO
          --------------------------------------------------------- */}
          <div className="mt-4">
            {success && <div className="text-sm text-green-600">{success}</div>}
            {Object.keys(errors).length > 0 && (
              <div className="text-sm text-red-600">
                Corrija os campos em destaque antes de prosseguir.
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
  );
}
