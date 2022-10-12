import {helper, validationSchema} from '~/common';
import {http_status} from '~/common/constant';
import {orm} from '~/config';
import TripService from '~/services/trip.service';

const prisma = orm.getInstance();
const schema = validationSchema.trip;
const TripController = {};

TripController.get = async (req, res) => {
  const {skip, limit, pattern} = req.query;
  const conditions = {
    skip: skip ? skip : 0,
    take: limit ? limit : 20
  };

  let searchByPattern = {};
  if (pattern) {
    searchByPattern = {
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
    };
  }

  const trips = await prisma.trip.findMany({
    where: {
      ...searchByPattern
    },
    include: {
      from: true,
      to: true,
      _count: {select: {schedules: true}}
    },
    ...conditions
  });

  return res.json({
    status: http_status.ok,
    data: trips
  });
};

TripController.getOne = async (req, res) => {
  const validation = schema.getOnes.validate(req.params);
  if (validation.error) throw validation.error;

  const {id} = req.params;
  const trip = await prisma.trip.findUnique({
    where: {id: Number(id)},
    include: {
      from: true,
      to: true,
      _count: {select: {schedules: true}}
    }
  });

  if (!trip) throw helper.http.createError(http_status.not_found, 'Trips not found.');

  return res.json({
    status: 200,
    data: trip
  });
};

TripController.post = async (req, res) => {
  const validation = schema.create.validate(req.body);
  if (validation.error) throw validation.error;

  const {departure, arrival, distance, travelTime} = req.body;
  if (departure === arrival)
    throw helper.http.createError(
      http_status.unprocessable_entity,
      'Departure and arrival must not be the same.'
    );

  const creRes = await TripService.create({
    departure,
    arrival,
    distance,
    travelTime
  });

  return res.json({
    status: 200,
    data: creRes
  });
};

TripController.put = async (req, res) => {
  const {id} = req.params;
  const {departure, arrival, distance, travelTime} = req.body;
  const validation = schema.put.validate({...req.params, ...req.body});
  if (validation.error) throw validation.error;

  const modRes = await prisma.trip.update({
    where: {id: Number(id)},
    data: {
      departure,
      arrival,
      distance,
      travelTime
    }
  });

  return res.json({
    status: 200,
    data: modRes
  });
};

TripController.patch = async (req, res) => {
  const {ids} = req.body;
  const validation = schema.patch.validate(req.body);
  if (validation.error) throw validation.error;

  const modRes = await TripService.delete(ids.map(x => Number(x)));

  return res.json({
    status: 200,
    data: modRes
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
