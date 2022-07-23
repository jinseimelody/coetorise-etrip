const Joi = require('joi').extend(require('@joi/date'));
const schema = {};

schema.user = {
  register: Joi.object({
    name: Joi.string(),
    email: Joi.string().required().email().lowercase(),
    password: Joi.string().required().min(2)
  }),
  login: Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required()
  })
};

schema.booking = {
  search: Joi.object({
    from: Joi.number().required(),
    to: Joi.number().required(),
    date: Joi.date().required().format('YYYY-MM-DD').utc()
  }),
  placement: Joi.object({
    scheduleId: Joi.number().required(),
    date: Joi.date().required().format('YYYY-MM-DD').utc()
  })
};

export default schema;
