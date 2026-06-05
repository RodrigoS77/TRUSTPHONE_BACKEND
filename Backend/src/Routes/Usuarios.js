import express from 'express';
import UsuariosController from '../Controllers/UsuariosController.js';

const router = express.Router();

router.route('/')
    .get(UsuariosController.getUsuarios)
    .post(UsuariosController.insertUsuario);

router.route('/:id')
    .get(UsuariosController.getUsuarioById)
    .put(UsuariosController.updateUsuario)
    .delete(UsuariosController.deleteUsuario);

export default router;
