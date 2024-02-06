import express from 'express';
import * as mailController from '../../controllers/notification.controller.js';

const mailRouter = express.Router();
const smsRouter = express.Router();

mailRouter.post('/', mailController.sendEmail);
smsRouter.post('/', mailController.sendSMS);

export { mailRouter, smsRouter}
