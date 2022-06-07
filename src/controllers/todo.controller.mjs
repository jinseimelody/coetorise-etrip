import orm from '../config/orm.mjs';

const prisma = orm.getInstace();
const TodoController = {};

TodoController.getAllTodos = async (_, res) => {
  const todos = await prisma.todo.findMany({
    include: {
      author: true
    }
  });
  res.json(todos);
};

TodoController.getTodo = async (req, res) => {
  const {id} = req.params;
  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(id) || -1
    },
    include: {
      author: true
    }
  });
  res.json(todo);
};

export default TodoController;
