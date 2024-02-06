import express from 'express';
import {getMockProducts} from '../../controllers/mock.controller.js';

const router = express.Router();

router.get('/', getMockProducts);


export default router;
