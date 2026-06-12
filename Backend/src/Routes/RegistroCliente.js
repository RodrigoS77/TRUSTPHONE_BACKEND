import express from 'express';
import RegistroClienteController from '../Controllers/RegistroClienteController.js';
import upload from '../utils/CloudinaryConfig.js';

const router = express.Router();

// Registrar cliente
router.route('/')
.post(upload.single("fotoPerfil"),RegistroClienteController.registerCliente);
router.route('/verifyCodeEmail').post(RegistroClienteController.verifyCode);

export default router;