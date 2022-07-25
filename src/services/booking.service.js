import {helper, http_status} from '~/common';
import {orm} from '~/config';

const prisma = orm.getInstace();
const BookingService = {};

BookingService.create = async ({scheduleId, date, seatIds, userId}) => {
  return await prisma.$transaction(async pris => {
    // get current price for this trip
    const schedule = await pris.schedule.findFirst({
      where: {id: scheduleId, date: new Date(date)},
      include: {trip: true}
    });
    if (!schedule)
      throw helper.http.createError(http_status.not_found, `schedule not provided`);
    const price = schedule.trip.price;

    // make sure picked seats are avaliable for now
    const booked = await pris.ticket.aggregate({
      _count: true,
      where: {
        scheduleId,
        date: new Date(date),
        seatId: {in: seatIds}
      }
    });
    if (booked._count > 0)
      throw helper.http.createError(
        http_status.gone,
        'session timeout: seats already be booked by someone else'
      );

    // create new booking
    const numberOfCreated = await pris.ticket.createMany({
      data: seatIds.map(seatId => ({
        scheduleId,
        date: new Date(date),
        userId,
        seatId,
        price
      }))
    });

    return numberOfCreated;
  });
};

export default BookingService;
