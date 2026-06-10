import express from 'express';
import RevisionCelularesController from '../Controllers/RevisionCelulares.js';

const router = express.Router();

router.route('/')
    .get(RevisionCelularesController.getRevisiones)
    .post(RevisionCelularesController.insertRevision);

router.route('/:id')
    .put(RevisionCelularesController.updateRevision)
    .delete(RevisionCelularesController.deleteRevision);

export default router;