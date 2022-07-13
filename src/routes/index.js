import express from 'express';
import todoRoute from './todo.route.js';
import userRoute from './user.route.js';

const apiRoute = express.Router();

// middleware that is specific to this router
apiRoute.use((req, res, next) => {
  next();
});

apiRoute.use('/todos', todoRoute);
apiRoute.use('/users', userRoute);

// define the home page route
apiRoute.get('/', (_, res) => {
  res.send('Hi, How are you today');
});

apiRoute.get('*', (_, res) => {
  res.send('Oop 404');
});

export default apiRoute;
