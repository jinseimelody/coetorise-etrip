import express from 'express';

const apiRoute = express.Router();

apiRoute.use('/auth', require('./auth.route').default);
apiRoute.use('/user', require('./user.route').default);
apiRoute.use('/trips', require('./trip.route').default);
apiRoute.use('/bookings', require('./booking.route').default);
apiRoute.use('/payments', require('./payment.route').default);
apiRoute.use('/tickets', require('./ticket.route').default);
apiRoute.use('/endpoints', require('./endpoint.route').default);
apiRoute.use('/rest', require('./rest').default);

// define the home page route
apiRoute.get('/', (_, res) => {
  res.send('Hi, How are you today');
});

apiRoute.get('*', (_, res) => {
  res.send('Oop 404');
});

export default apiRoute;
