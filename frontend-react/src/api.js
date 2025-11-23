// ---------------------------------------------------------
// Arquivo de API centralizado
// Responsável por gerenciar chamadas para o backend.
// ---------------------------------------------------------

import axios from "axios";

// 🔧 Defina aqui a URL do backend
const API = axios.create({
  baseURL: "http://localhost:3000", // ajuste se sua API usar outra porta
});

export default API;
