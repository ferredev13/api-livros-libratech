// ---------------------------------------------------------
// Rotas de usuário
// - /users/register         -> criar conta
// - /users/change-password  -> alterar senha (protegida)
// ---------------------------------------------------------

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Registro público
router.post("/register", userController.register);

// Alterar senha (protegida)
router.post("/change-password", authMiddleware, userController.changePassword);

module.exports = router;
