import express from 'express';
import { createIceOrder, getOrder } from '../controllers/orderController';
import { validateBody } from '../middlewares/validate';
import { orderCreateSchemaValidation } from '../validations/orderCreateSche,a';

const router = express.Router();

router.post('/create',  validateBody(orderCreateSchemaValidation), createIceOrder);
router.get('/:id', getOrder);

export default router;
