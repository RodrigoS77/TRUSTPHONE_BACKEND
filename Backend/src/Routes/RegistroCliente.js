import express from 'express';
import RegistroClienteController from '../Controllers/RegistroClienteController.js';

const router = express.Router();

router.route('/').post(RegistroClienteController.registerCliente);
router.route('/verifyCodeEmail').post(RegistroClienteController.verifyCode);

export default router;