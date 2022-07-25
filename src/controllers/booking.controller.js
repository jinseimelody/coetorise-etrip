import {validationSchema, http_status} from '~/common';
import BookingService from '~/services/booking.service';

const schema = validationSchema.booking;
const BookingController = {};

BookingController.create = async (req, res) => {
  const {scheduleId, date, seatIds} = req.body;
  const validation = schema.create.validate(req.body);
  if (validation.error) throw validation.error;

  const userId = 1;
  const creRes = await BookingService.create({scheduleId, date, seatIds, userId});
  res.status = http_status.created;
  return res.json(creRes);
};

export default BookingController;
