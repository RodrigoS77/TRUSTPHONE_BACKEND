import express from "express"
import LogOutController from "../Controllers/LogOutController.js"

const router = express.Router();

router.route("/").post(LogOutController.LogOut)

export default router