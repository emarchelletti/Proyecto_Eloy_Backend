import express from 'express';
import * as productsController from '../../controllers/products.controller.js';
import { isAdmin, isAdminOrPremium } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:productId', productsController.getProductById);
router.post('/', isAdminOrPremium, productsController.createProduct);
router.put('/:productId', isAdminOrPremium, productsController.updateProduct);
router.delete('/:productId', isAdminOrPremium, productsController.deleteProduct);

export default router;
