import express from 'express';
import BookingController from '~/controllers/booking.controller';
import middleware, {use} from '~/middleware';

const router = express.Router();

router.post('/search', use(BookingController.search));
router.post('/join', use(BookingController.join));

export default router;
