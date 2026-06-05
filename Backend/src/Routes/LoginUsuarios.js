import express from "express"

import loginUsuarioController from "../Controllers/LoginUsuariosController.js"

const router = express.Router();

router.route("/").post(loginUsuarioController.login)

export default router;