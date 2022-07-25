import {orm} from '~/config';
import {validationSchema} from '~/common';
import TripService from '~/services/trip.service';

const schema = validationSchema.trip;
const TripController = orm.getInstace();

TripController.search = async (req, res) => {
  const {from, to, date} = req.query;
  const validation = schema.search.validate(req.query);
  if (validation.error) throw validation.error;

  const result = await TripService.search({from, to, date});
  return res.json(result);
};

TripController.getOne = async (req, res) => {
  const {scheduleId, date} = req.params;
  const validation = schema.getOne.validate(req.params);
  if (validation.error) throw validation.error;

  const result = await TripService.getOne({scheduleId, date});
  return res.json(result);
};

export default TripController;
