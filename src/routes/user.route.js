import express from 'express';
import UserController from '~/controllers/user.controller.js';
import {use} from '~/middleware';

const router = express.Router();

router.post('/login', use(UserController.login));
router.post('/register', use(UserController.register));

export default router;
