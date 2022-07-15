import {orm} from '~/config';

const prisma = orm.getInstace();
const TodoController = orm.getInstace();

TodoController.getAllTodos = async (_, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
};

export default TodoController;
