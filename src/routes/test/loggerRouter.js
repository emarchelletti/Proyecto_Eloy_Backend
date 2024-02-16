import express from 'express';
import {loggerGet} from "../../controllers/logger.controller.js";

const router = express.Router();

router.get('/', loggerGet);


export default router;