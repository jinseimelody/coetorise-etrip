import express from 'express';
import AuthController from '~/controllers/auth.controller.js';
import {use} from '~/middleware';

const router = express.Router();

router.post('/login', use(AuthController.login));

export default router;
