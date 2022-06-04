import express from 'express';
import router from './todo.route.mjs';

const apiRoute = express.Router();

// middleware that is specific to this router
apiRoute.use((req, res, next) => {
    next();
});

// define the home page route
apiRoute.get('/', (_, res) => {
    res.send("You are in homepage");
});

apiRoute.use('/todos', router);

export default apiRoute;