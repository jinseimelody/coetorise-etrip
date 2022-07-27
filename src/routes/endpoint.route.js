import express from 'express';
import EndpointController from '~/controllers/endpoint.controller';
import {use} from '~/middleware';

const router = express.Router();

router.get('/', use(EndpointController.search));

export default router;
