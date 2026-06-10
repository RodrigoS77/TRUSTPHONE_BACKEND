import express from "express"
import loginClienteController from "../Controllers/loginClienteController.js"

const router = express.Router();

router.route("/").post(loginClienteController.login)

export default router;