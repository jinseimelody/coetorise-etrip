import express from 'express';

const apiRoute = express.Router();

apiRoute.use('/user', require('./user.route').default);
apiRoute.use('/todo', require('./todo.route').default);
apiRoute.use('/trip', require('./trip.route').default);
apiRoute.use('/booking', require('./booking.route').default);

// define the home page route
apiRoute.get('/', (_, res) => {
  res.send('Hi, How are you today');
});

apiRoute.get('*', (_, res) => {
  res.send('Oop 404');
});

export default apiRoute;
