import express from 'express';
import MarcasController from '../Controllers/MarcasController.js';

const router = express.Router();

router.route('/')
    .get(MarcasController.getMarcas)
    .post(MarcasController.insertMarcas);

    router.route("/BuscarPorNombre").post(MarcasController.getMarcasPorNombre);

router.route('/:id')
    .get(MarcasController.getMarcasById)
    .put(MarcasController.updateMarcas)
    .delete(MarcasController.deleteMarcas);

export default router;