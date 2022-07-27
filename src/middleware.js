import {helper, http_status} from '~/common';

const middleware = {};

middleware.reqInterceptor = (req, res, next) => {
  next();
};

// eslint-disable-next-line no-unused-vars
middleware.errorHandler = (err, req, res, next) => {
  let status = err.code || http_status.internal_server_error;
  if (err.isJoi === true) status = http_status.unprocessable_entity;

  return res.json({
    status,
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
    const payload = helper.jwt.verify(token, process.env.JWT_ACCESS_SECRET);
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
