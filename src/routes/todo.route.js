import express from 'express';
import TodoController from '~/controllers/todo.controller.js';

const router = express.Router();

router.get('/', TodoController.getAllTodos);

router.get('/:id', TodoController.getTodo);

export default router;
