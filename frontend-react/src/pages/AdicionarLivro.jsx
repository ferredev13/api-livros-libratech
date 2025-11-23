import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ---------------------------------------------------------
// ADICIONAR LIVRO — Página /livros/novo
// - Layout 2 colunas
// - Sem upload de capa
// - Card branco sobre fundo #EEF3F8
// - Validações básicas no cliente
// ---------------------------------------------------------

const LOGO_URL = "/mnt/data/Tela Login.png"; // caminho local do logo (fornecido na sessão)

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
    if (!titulo.trim()) e.titulo = "Título é obrigatório";
    if (!genero.trim()) e.genero = "Gênero é obrigatório";
    if (!isbn.trim()) e.isbn = "ISBN é obrigatório";
    // descrição pode ser opcional, mas vamos pedir mínimo 10 chars
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

    // Simulação de delay de rede
    await new Promise((r) => setTimeout(r, 700));

    // Simula resposta do servidor: cria um objeto livro
    const novo = {
      id: Math.floor(Math.random() * 10000) + 10,
      isbn: isbn.trim(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      genero: genero.trim(),
      criadoEm: new Date().toLocaleString(),
      atualizadoEm: null,
    };

    // Aqui você deve chamar a API para salvar (ex: fetch POST)
    // Exemplo:
    // await fetch("/api/livros", { method: "POST", body: JSON.stringify(novo) });

    setSubmitting(false);
    setSuccess("Livro criado com sucesso!");
    // limpa formulário
    setIsbn("");
    setTitulo("");
    setDescricao("");
    setGenero("");

    // após 1.2s redireciona para a lista
    setTimeout(() => {
      navigate("/livros");
    }, 1200);
  }

  return (
    <div className="min-h-screen w-full bg-[#EEF3F8]">
      {/* ---------------------------------------------------------
         HEADER
      --------------------------------------------------------- */}
      <header className="max-w-[1100px] mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} alt="LibraTech" className="w-[56px] md:w-[70px]" />
          <div>
            <div className="font-rajdhani font-semibold text-[18px] md:text-[20px] text-[#2D2D2D]">
              Adicionar Livro
            </div>
            <div className="text-xs text-[#6B7280]">Preencha os campos para registrar um novo livro</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/livros")}
            className="bg-white border border-gray-200 text-[#374151] px-3 py-2 rounded-md hover:bg-gray-50 transition"
          >
            Voltar à lista
          </button>
        </div>
      </header>

      {/* ---------------------------------------------------------
         MAIN — CARD BRANCO SÓLIDO (LAYOUT 2 COLUNAS)
      --------------------------------------------------------- */}
      <main className="max-w-[1100px] mx-auto px-6 pb-12">
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
                className={`w-full px-4 py-2 rounded-md border ${errors.isbn ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.isbn && <div className="text-xs text-red-500">{errors.isbn}</div>}

              <label className="text-sm font-medium text-gray-700 mt-3">Título</label>
              <input
                value={titulo}
                onChange={(ev) => setTitulo(ev.target.value)}
                placeholder="Título do livro"
                className={`w-full px-4 py-2 rounded-md border ${errors.titulo ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.titulo && <div className="text-xs text-red-500">{errors.titulo}</div>}

              <label className="text-sm font-medium text-gray-700 mt-3">Gênero</label>
              <input
                value={genero}
                onChange={(ev) => setGenero(ev.target.value)}
                placeholder="Ex: Fantasia, Tecnologia, Romance"
                className={`w-full px-4 py-2 rounded-md border ${errors.genero ? "border-red-400" : "border-gray-200"}`}
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
                className={`w-full px-4 py-2 rounded-md border ${errors.descricao ? "border-red-400" : "border-gray-200"}`}
              />
              {errors.descricao && <div className="text-xs text-red-500">{errors.descricao}</div>}

              {/* Espaço reservado para campos futuros */}
              <div className="flex items-end justify-end">
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
              <div className="text-sm text-red-600">Corrija os campos em destaque antes de prosseguir.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
