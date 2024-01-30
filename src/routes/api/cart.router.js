import express from 'express';
import * as cartController from '../../controllers/carts.controller.js';
import { isUser } from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.get("/", cartController.getAll);
router.get("/:cartId", cartController.getById);
router.post("/", cartController.create);
router.put("/:cartId", cartController.update);
router.delete("/:cartId", cartController.remove);
router.post("/:cartId/products/:productId", isUser,cartController.addProdToCart);
router.delete("/:cartId/products/:productId", isUser,cartController.removeProdToCart);
router.put("/:cartId/products/:productId", isUser,cartController.updateProdQuantityToCart);
router.get  ("/:cartId/purchase", isUser,cartController.processPurchase);


export default router;
