import express from 'express';
import BookingController from '~/controllers/booking.controller';
import middleware, {use} from '~/middleware';

const router = express.Router();

router.post('/', middleware.auth, use(BookingController.create));

export default router;
