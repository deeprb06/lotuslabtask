import express from 'express';
import { iceCreamFlavoursList } from '../controllers/icecreamController';

const router = express.Router();

router.get('/list', iceCreamFlavoursList);

export default router;
