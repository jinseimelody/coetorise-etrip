import {Orm} from '~/config';

const prisma = Orm.getInstace();
const TodoController = {};

TodoController.getAllTodos = async (_, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
};

TodoController.getTodo = async (req, res) => {
  const {id} = req.params;
  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(id) || -1
    }
  });
  res.json(todo);
};

export default TodoController;
