import express from 'express';
import PaymentController from '~/controllers/payment.controller';
import {use} from '~/middleware';

const router = express.Router();

router.post('/', use(PaymentController.pay));

export default router;
