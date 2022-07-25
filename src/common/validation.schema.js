const Joi = require('joi').extend(require('@joi/date'));
const schema = {};

const rules = {
  email: Joi.string().required().email().lowercase(),
  password: Joi.string().required().min(2),
  string: Joi.string(),
  number: Joi.number().required(),
  date: Joi.date().required().format('YYYY-MM-DD').utc(),
  array: Joi.array().required()
};

schema.user = {
  register: Joi.object({
    name: rules.string,
    email: rules.email,
    password: rules.password
  }),
  login: Joi.object({
    email: rules.email,
    password: rules.password
  })
};

schema.trip = {
  search: Joi.object({
    from: rules.number,
    to: rules.number,
    date: rules.date
  }),
  getOne: Joi.object({
    scheduleId: rules.number,
    date: rules.date
  })
};

schema.booking = {
  create: Joi.object({
    scheduleId: rules.number,
    date: rules.date,
    seatIds: rules.array.items(Joi.string()).min(1).unique()
  })
};

export default schema;
