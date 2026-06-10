import express from 'express';
import TecnicosController from "../Controllers/TecnicosController.js"

const router = express.Router();

router.route('/')
.get(TecnicosController.getTecnicos)
.post(TecnicosController.insertTecnico)

router.route('/:id')
.delete(TecnicosController.deleteTecnico)
.put(TecnicosController.updateTecnico)

export default router; 