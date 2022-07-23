import express from 'express';
import BookingController from '~/controllers/booking.controller';
import middleware, {use} from '~/middleware';

const router = express.Router();

router.get('/search', use(BookingController.search));
router.get('/placement', use(BookingController.placement));

export default router;
