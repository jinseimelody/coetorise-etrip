import express from 'express';
import {TripController} from '~/controllers';
import middleware, {use} from '~/middleware';

const router = express.Router();

router.get('/', middleware.auth, use(TripController.getAll));

export default router;
