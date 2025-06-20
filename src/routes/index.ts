import express from 'express';
import icecreamRoutes from './icecream';
import orderRoutes from './order';

const router = express.Router();

router.use('/product', icecreamRoutes);
router.use('/order', orderRoutes);

export default router;