import {validationSchema} from '~/helpers';
import {Booking} from '~/repositories';

const schema = validationSchema.booking;
const BookingController = {};

BookingController.search = async (req, res) => {
  const {from, to, date} = req.body;
  const validation = schema.search.validate(req.body);
  if (validation.error) throw validation.error;

  const result = await Booking.findTrips({from, to, date});
  return res.json(result);
};

BookingController.join = async (req, res) => {
  const {scheduleId, date} = req.body;
  const validation = schema.join.validate(req.body);
  if (validation.error) throw validation.error;

  const result = await Booking.findSeats({scheduleId, date});
  return res.json(result);
};

export default BookingController;
