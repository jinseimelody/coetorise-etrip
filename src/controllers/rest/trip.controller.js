import {http_status, pagination} from '~/common/constant';
import {orm} from '~/config';

const prisma = orm.getInstance();
const TripController = {};

TripController.get = async (req, res) => {
  const {skip, limit, pattern} = req.query;
  const conditions = {
    skip: skip ? skip : 0,
    take: limit ? limit : 20
  };
  const trips = await prisma.trip.findMany({
    where: {
      OR: [
        {
          from: {
            name: {
              startsWith: pattern
            }
          }
        },
        {
          from: {
            district: {
              startsWith: pattern
            }
          }
        },
        {
          to: {
            name: {
              startsWith: pattern
            }
          }
        },
        {
          to: {
            district: {
              startsWith: pattern
            }
          }
        }
      ]
    },
    include: {
      from: true,
      to: true
    },
    ...conditions
  });

  return res.json({
    status: http_status.ok,
    data: trips
  });
};

TripController.getOne = (req, res) => {
  return res.json({
    status: 200,
    params: req.params,
    query: req.query,
    message: 'get one ok'
  });
};

TripController.post = (req, res) => {
  return res.json({
    status: 200,
    data: req.body,
    message: 'post ok'
  });
};

TripController.put = (req, res) => {
  return res.json({
    status: 200,
    data: req.body,
    message: 'put ok'
  });
};

TripController.delete = (req, res) => {
  return res.json({
    status: 200,
    params: req.params,
    message: 'delete ok'
  });
};

export default TripController;
