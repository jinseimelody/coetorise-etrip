import express from 'express';
import EndPointController from '~/controllers/rest/end.point.controller';
import ScheduleController from '~/controllers/rest/schedule.controller';
import TripController from '~/controllers/rest/trip.controller';
import {use} from '~/middleware';

const router = express.Router();

router.get('/trips', use(TripController.get));
router.get('/trips/:id', use(TripController.getOne));
router.post('/trips', use(TripController.post));
router.put('/trips/:id', use(TripController.put));
router.patch('/trips', use(TripController.patch));
router.delete('/trips/id', use(TripController.delete));

router.get('/endpoints', use(EndPointController.get));
router.get('/endpoints/:id', use(EndPointController.getOne));
router.post('/endpoints', use(EndPointController.post));
router.put('/endpoints/:id', use(EndPointController.put));
router.patch('/endpoints', use(EndPointController.patch));
router.delete('/endpoints/:id', use(EndPointController.delete));

router.get('/schedules', use(ScheduleController.get));
router.get('/schedules/:id', use(ScheduleController.getOne));
router.post('/schedules', use(ScheduleController.post));
router.put('/schedules/:id', use(ScheduleController.put));
router.patch('/schedules', use(ScheduleController.patch));
router.delete('/schedules/:id', use(ScheduleController.delete));

export default router;
