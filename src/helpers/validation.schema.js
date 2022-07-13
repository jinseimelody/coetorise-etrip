import Joi from 'joi';

const schema = {};

schema.user = {
  register: Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required()
  })
};

export default schema;
