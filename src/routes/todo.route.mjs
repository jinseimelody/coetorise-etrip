import express from 'express';
import TodoController from '../controllers/todo.controller.mjs';

const router = express.Router();

router.get('/', TodoController.getAllTodos);

router.get('/id/:id', TodoController.getTodo);


export default router;
