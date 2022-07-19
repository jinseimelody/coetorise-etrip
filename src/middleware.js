import {jwt} from './helpers';

const middleware = {};

// eslint-disable-next-line no-unused-vars
middleware.errorHandler = (err, req, res, next) => {
  if (err.isJoi === true) res.status(442);

  res.status(res.statusCode || 500);
  return res.json({
    error: {
      message: err.message
    }
  });
};

middleware.auth = (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error('Unauthorized.');
  }

  try {
    // eslint-disable-next-line no-unused-vars
    const [_, token] = authorization.split(' ');
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
  } catch (err) {
    res.status(401);
    if (err.name === 'TokenExpiredError') {
      throw new Error(err.name);
    }
    throw new Error('Unauthorized.');
  }

  return next();
};

const use = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

export {use};

export default middleware;
