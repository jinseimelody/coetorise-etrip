import express from 'express';
import BookingController from '~/controllers/booking.controller';
import {use} from '~/middleware';

const router = express.Router();

router.post('/', use(BookingController.create));

export default router;
