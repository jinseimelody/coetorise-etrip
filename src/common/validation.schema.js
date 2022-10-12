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
  getAll: Joi.object({
    limit: rules.number,
    skip: rules.number
  }),
  getOne: Joi.object({
    id: rules.number
  }),
  create: Joi.object({
    name: rules.string,
    district: rules.string
  }),
  put: Joi.object({
    id: rules.number,
    name: rules.string,
    district: rules.string
  }),
  patch: Joi.object({
    ids: rules.array.items(Joi.number())
  }),
  delete: Joi.object({
    id: rules.number
  })
};

schema.auth = {
  login: Joi.object({
    email: rules.email,
    password: rules.password
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
  getOnes: Joi.object({
    id: rules.number
  }),
  getOne: Joi.object({
    scheduleId: rules.number,
    date: rules.date
  }),
  create: Joi.object({
    departure: rules.number,
    arrival: rules.number,
    distance: rules.number,
    travelTime: rules.number
  }),
  put: Joi.object({
    id: rules.number,
    departure: rules.number,
    arrival: rules.number,
    distance: rules.number,
    travelTime: rules.number
  }),
  patch: Joi.object({
    ids: rules.array.items(Joi.number())
  })
};

schema.schedule = {
  get: Joi.object({
    tripId: rules.number,
    limit: rules.number,
    skip: rules.number
  })
};

schema.booking = {
  create: Joi.object({
    chosen: Joi.object({
      scheduleId: rules.number,
      date: rules.date,
      seatIds: rules.array.items(Joi.string()).min(1).unique()
    }),
    contact: Joi.object({
      passenger: rules.string,
      phoneNumber: rules.string,
      email: rules.email,
      note: rules.string
    })
  }),
  getOne: Joi.object({
    ticketId: rules.string
  })
};

schema.payment = {
  pay: Joi.object({
    paymentMethod: rules.number,
    ticketId: rules.string,
    sessionId: rules.number
  })
};

export default schema;
