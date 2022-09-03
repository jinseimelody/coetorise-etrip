const Joi = require('joi').extend(require('@joi/date'));
const schema = {};

const rules = {
  email: Joi.string().email().lowercase(),
  password: Joi.string().min(2),
  string: Joi.string(),
  number: Joi.number(),
  date: Joi.date().format('YYYY-MM-DD').utc(),
  array: Joi.array()
};

schema.endpoint = {
  search: Joi.object({
    q: Joi.string().allow('', null)
  }),
  getOne: Joi.object({
    endpointId: rules.number
  })
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
    date: rules.date,
    time: rules.string,
    layoutId: rules.string,
    nonBookedCount: rules.number,
    sortBy: rules.string,
    sortType: rules.string,
    pageNumber: rules.number
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
  }),
  getOne: Joi.object({
    ticketId: rules.string
  })
};

export default schema;
