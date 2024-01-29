import express from 'express';
import * as cartController from '../../controllers/carts.controller.js';

const router = express.Router();

router.get('/', cartController.showCart);
router.post('/add', cartController.addToCart);
router.post('/remove/:productId', cartController.removeFromCart);
router.post('/clear', cartController.clearCart);

export default router;
