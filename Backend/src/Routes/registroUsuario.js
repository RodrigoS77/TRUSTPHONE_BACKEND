import express from 'express';
import RegistroUsuariosController from '../Controllers/registerUsuariosController.js';

const router = express.Router();

router.route('/').post(RegistroUsuariosController.registerUsuario)
router.route('/verifyCodeEmail').post(RegistroUsuariosController.verifyCode)

export default router;