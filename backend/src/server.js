// -----------------------------------------
// Inicialização do servidor da aplicação
// Responsável por carregar variáveis de ambiente,
// importar o app.js (rotas/middlewares) e subir a API
// -----------------------------------------

require("dotenv").config(); // Carrega variáveis do arquivo .env

const app = require("./app"); // Importa configuração principal da aplicação
const port = process.env.PORT || 3000; // Define a porta do servidor

// Inicia o servidor e exibe mensagem no console
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
