import express from 'express';
import {getMockProducts, createMockProduct} from '../../controllers/mock.controller.js';

const router = express.Router();

router.get('/', getMockProducts);
router.post('/', createMockProduct);


export default router;
