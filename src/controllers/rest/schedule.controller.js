import {http_status} from '~/common/constant';
import {orm} from '~/config';
import {validationSchema} from '~/common';

const prisma = orm.getInstance();
const schema = validationSchema.schedule;
const ScheduleController = {};

ScheduleController.get = async (req, res) => {
  const validation = schema.get.validate(req.query);
  if (validation.error) throw validation.error;

  const {skip, limit, tripId} = req.query;
  const pagination = {
    skip: skip ? skip : 0,
    take: limit ? limit : 20,
    orderBy: {
      start: 'asc'
    }
  };

  const conditions = {};
  if (tripId) {
    conditions.tripId = tripId;
  }

  const schedule = await prisma.schedule.findMany({
    where: conditions,
    ...pagination
  });

  return res.json({
    status: http_status.ok,
    data: schedule
  });
};

ScheduleController.getOne = async (req, res) => {
  return res.json({
    status: 200,
    data: 'ok'
  });
};

ScheduleController.post = async (req, res) => {
  return res.json({
    status: 200,
    data: 'ok'
  });
};

ScheduleController.put = async (req, res) => {
  return res.json({
    status: 200,
    data: 'ok'
  });
};

ScheduleController.patch = async (req, res) => {
  return res.json({
    status: 200,
    data: 'ok'
  });
};

ScheduleController.delete = async (req, res) => {
  return res.json({
    status: 200,
    data: 'ok'
  });
};

export default ScheduleController;
