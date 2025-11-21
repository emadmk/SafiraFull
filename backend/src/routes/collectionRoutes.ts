import { Router } from 'express';
import { CollectionController } from '../controllers/collectionController';
import { errorHandler } from '../middlewares/errorHandler';

const router = Router();

router.get('/', (req, res, next) => CollectionController.getAll(req, res).catch(next));

router.get('/:id', (req, res, next) => CollectionController.getById(req, res).catch(next));

router.get('/:id/available-pieces', (req, res, next) =>
  CollectionController.getAvailablePieces(req, res).catch(next)
);

router.use(errorHandler);

export default router;
