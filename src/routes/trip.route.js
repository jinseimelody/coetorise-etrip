import express from 'express';
import {TripController} from '~/controllers';
import {use} from '~/middleware';

const router = express.Router();

router.get('/', use(TripController.search));
router.get('/:scheduleId/:date', use(TripController.getOne));

export default router;
