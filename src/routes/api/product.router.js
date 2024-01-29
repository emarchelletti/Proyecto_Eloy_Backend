import express from 'express';
import * as productsController from '../../controllers/products.controller.js';
import { isAdmin } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:productId', productsController.getProductById);
router.post('/', isAdmin, productsController.createProduct);
router.put('/:productId', isAdmin, productsController.updateProduct);
router.delete('/:productId', isAdmin, productsController.deleteProduct);

export default router;
