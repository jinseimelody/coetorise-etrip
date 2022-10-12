import {http_status} from '~/common/constant';
import {orm} from '~/config';
import {validationSchema} from '~/common';
import EndpointService from '~/services/endpoint.service';

const prisma = orm.getInstance();
const schema = validationSchema.endpoint;
const EndPointController = {};

EndPointController.get = async (req, res) => {
  const validation = schema.getAll.validate(req.query);
  if (validation.error) throw validation.error;

  const {skip, limit} = req.query;
  const conditions = {
    skip: skip ? skip : 0,
    take: limit ? limit : 20,
    orderBy: {
      createdDate: 'desc'
    }
  };

  const endpoints = await prisma.endPoint.findMany({
    include: {
      fsp: true,
      tsp: true
    },
    ...conditions
  });

  return res.json({
    status: http_status.ok,
    data: endpoints
  });
};

EndPointController.getOne = async (req, res) => {
  const validation = schema.getOne.validate(req.params);
  if (validation.error) throw validation.error;

  const {id} = req.params;
  const endpoint = await prisma.endPoint.findUnique({
    where: {id: Number(id)},
    include: {
      fsp: true,
      tsp: true
    }
  });

  return res.json({
    status: 200,
    data: endpoint
  });
};

EndPointController.post = async (req, res) => {
  const validation = schema.create.validate(req.body);
  if (validation.error) throw validation.error;

  const {name, district} = req.body;
  const creRes = await EndpointService.create({
    name,
    district
  });

  return res.json({
    status: 200,
    data: creRes
  });
};

EndPointController.put = async (req, res) => {
  const {id} = req.params;
  const {name, district} = req.body;
  const validation = schema.put.validate({...req.params, ...req.body});
  if (validation.error) throw validation.error;

  const modRes = await EndpointService.update({
    id,
    name,
    district
  });

  return res.json({
    status: 200,
    data: modRes
  });
};

EndPointController.patch = async (req, res) => {
  const {ids} = req.body;
  const validation = schema.patch.validate(req.body);
  if (validation.error) throw validation.error;

  const modRes = await EndpointService.delete(ids.map(x => Number(x)));

  return res.json({
    status: 200,
    data: modRes
  });
};

EndPointController.delete = async (req, res) => {
  const {id} = req.params;
  const validation = schema.delete.validate(req.params);
  if (validation.error) throw validation.error;

  const delRes = await prisma.endPoint.delete({
    where: {id: Number(id)}
  });

  return res.json({
    status: 200,
    data: delRes
  });
};

export default EndPointController;
