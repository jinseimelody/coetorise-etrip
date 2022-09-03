import {validationSchema, http_status} from '~/common';
import BookingService from '~/services/booking.service';
import {reservationRevoke} from '~/config/kue';

const schema = validationSchema.booking;
const BookingController = {};

BookingController.create = async (req, res) => {
  const {scheduleId, date, seatIds} = req.body;
  const validation = schema.create.validate(req.body);
  if (validation.error) throw validation.error;

  const userId = 1;
  const ticketId = await BookingService.create({scheduleId, date, seatIds, userId});

  reservationRevoke(ticketId, 5 * 60 * 1000).then(jobId => {
    res.status = http_status.created;
    return res.json({ticketId, sessionId: jobId});
  });
};

BookingController.history = async (req, res) => {
  const {userId} = req.params;
  const validation = schema.history.validate(req.body);
  if (validation.error) throw validation.error;

  const history = await BookingService.getHistory(userId);
  return res.json(history);
};

export default BookingController;
