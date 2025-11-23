# 📚 LibraTech — Sistema de Gestão de Livros

<p align="center">
  <img src="frontend-react/src/assets/logotipo.png" alt="Banner do Projeto" width="160">
</p>

Sistema completo para **gerenciamento de livros**, com frontend em **React + TailwindCSS** e backend em **Node.js + Express + SQLite**.  
Interface moderna, padronizada e com telas de cadastro, edição, exclusão e listagem.

---

## 🏷️ Badges

<p>
  <img src="https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Vite-4.0-purple?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06b6d4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=nodedotjs" />
  <img src="https://img.shields.io/badge/Express-4-black?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/SQLite-3-blue?style=for-the-badge&logo=sqlite" />
  <img src="https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge" />
  <img src="https://img.shields.io/github/last-commit/ferredev13/api-livros-libratech?style=for-the-badge" />
</p>

---

## 📑 Índice

1. [Tecnologias Utilizadas](#-tecnologias-utilizadas)  
2. [Estrutura do Projeto](#-estrutura-do-projeto)  
3. [Como Executar o Backend](#-como-executar-o-backend)  
4. [Como Executar o Frontend](#-como-executar-o-frontend)  
5. [Rotas da API](#-rotas-da-api)  
6. [Preview da Aplicação](#-preview-da-aplicação)  
7. [Roadmap](#-roadmap)  
8. [Autor](#-autor)  
9. [Licença](#️-licença)

---

## 🚀 Tecnologias Utilizadas

### **Frontend**
- React  
- Vite  
- TailwindCSS  

### **Backend**
- Node.js  
- Express  
- SQLite  

### **Ferramentas**
- Git  
- GitHub  
- Postman  

---

## 📁 Estrutura do Projeto

```
api-livros-libratech/
├── backend/
│   ├── src/
│   ├── controllers/
│   ├── routes/
│   ├── database/
│   └── server.js
│
└── frontend-react/
    ├── src/
    │   ├── pages/
    │   │   ├── Livros.jsx
    │   │   ├── AdicionarLivro.jsx
    │   │   └── EditarLivro.jsx
    │   ├── components/
    │   └── App.jsx
```

---

## ⚙ Como Executar o Backend

### 1️⃣ Instalar dependências

```bash
cd backend
npm install
```

### 2️⃣ Executar servidor

```bash
npm start
```

Servidor disponível em:

```
http://localhost:3000
```

---

## 💻 Como Executar o Frontend

### 1️⃣ Instalar dependências

```bash
cd frontend-react
npm install
```

### 2️⃣ Rodar o Vite

```bash
npm run dev
```

Aplicação acessível em:

```
http://localhost:5173
```

---

## 🔗 Rotas da API (Mock)

| Método | Rota        | Descrição |
|--------|-------------|-----------|
| GET    | /livros     | Lista livros |
| GET    | /livros/:id | Detalhes do livro |
| POST   | /livros     | Cria novo livro |
| PUT    | /livros/:id | Atualiza livro |
| DELETE | /livros/:id | Remove livro |

---

## ▶ Preview da Aplicação

> Adicione imagens reais após gerar screenshots:

<p align="center">
 <img src="frontend-react/src/assets/tela_dashboard.jpg" alt="Banner do Projeto" width="35%">
</p>

---

## 🛠 Roadmap

- [ ] Conexão real com banco SQLite  
- [ ] API REST completa  
- [ ] Tela de login / autenticação  
- [ ] Controle de usuários  
- [ ] Deploy do backend  
- [ ] Deploy da aplicação completa  

---

## 👤 Autor

**Márcio Ferre Pereira**  
Desenvolvedor Front-End & Back-End  
GitHub: https://github.com/ferredev13

---

## 📝 Licença

Projeto sob a licença **MIT**.

---

> Feito por Márcio Ferre  
> ⭐ Se gostou, deixe uma estrela no repositório!
