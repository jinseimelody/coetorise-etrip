import {validationSchema} from '~/common';
import EndpointService from '~/services/endpoint.service';

const schema = validationSchema.endpoint;
const EndpointController = {};

EndpointController.search = async (req, res) => {
  const {q} = req.query;
  const validation = schema.search.validate(req.query);
  if (validation.error) throw validation.error;

  const result = await EndpointService.search({q});
  return res.json(result);
};

export default EndpointController;
