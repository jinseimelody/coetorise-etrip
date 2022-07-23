import {orm} from '~/config';
import {validationSchema} from '~/helpers';
import {Booking} from '~/repositories';

const prisma = orm.getInstace();
const schema = validationSchema.booking;
const BookingController = {};

BookingController.search = async (req, res) => {
  const {from, to, date} = req.query;
  const validation = schema.search.validate(req.query);
  if (validation.error) throw validation.error;

  const result = await Booking.findTrips({from, to, date});
  return res.json(result);
};

BookingController.placement = async (req, res) => {
  const {scheduleId, date} = req.query;
  const validation = schema.placement.validate(req.query);
  if (validation.error) throw validation.error;

  const bus = (
    await prisma.busAssign.findFirst({
      where: {scheduleId},
      include: {
        bus: true
      }
    })
  ).bus;

  const trip = (
    await prisma.schedule.findUnique({
      where: {id: scheduleId},
      include: {trip: true}
    })
  ).trip;

  console.log(trip);
  const seats = await Booking.findSeats({scheduleId, date});

  return res.json({
    trip,
    bus,
    seats: seats
  });
};

export default BookingController;
