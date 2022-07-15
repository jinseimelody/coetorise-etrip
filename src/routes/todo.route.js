import express from 'express';
import TodoController from '~/controllers/todo.controller.js';
import middleware, {use} from '~/middleware';

const router = express.Router();

router.get('/', middleware.auth, use(TodoController.getAllTodos));

export default router;
