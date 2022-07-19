import express from 'express';
import UserController from '~/controllers/user.controller.js';
import {use} from '~/middleware';

const router = express.Router();

router.post('/login', use(UserController.login));
router.post('/register', use(UserController.register));
router.post('/refresh', use(UserController.refreshToken));

export default router;
