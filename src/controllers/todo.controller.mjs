import * as debug from '../utilities/debug.mjs';

const TodoController = {};

TodoController.getAllTodos = (req, res) => {
    debug.info("Hey who are your, show me your identity card");
    res.json({
        numbers: Array(40).fill().map(() => Math.round(Math.random() * 100))
    });
};

TodoController.getTodo = (req, res) => {
    res.json({
        number: Math.round(Math.random() * req.params.id)
    });
};

export default TodoController;