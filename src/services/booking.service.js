import {helper, http_status, ticket_status} from '~/common';
import {orm} from '~/config';
import {v4} from 'uuid';
import moment from 'moment';

const prisma = orm.getInstance();
const BookingService = {};

BookingService.create = async (chosen, contact, userId) => {
  const {scheduleId, date, seatIds} = chosen;
  const {passenger, phoneNumber, email, note} = contact;

  return await prisma.$transaction(async pris => {
    // make sure reserved day is not a dayoff
    const dayoff = await pris.dayOff.findUnique({
      where: {unique: {scheduleId: Number(scheduleId), date: new Date(date)}}
    });
    if (dayoff)
      throw helper.http.createError(http_status.not_found, `schedule not provided`);

    // get current price for this trip
    const schedule = await pris.schedule.findFirst({
      where: {
        id: Number(scheduleId),
        OR: [{date: new Date(date)}, {cronType: 'Daily'}]
      }
    });

    if (!schedule)
      throw helper.http.createError(http_status.not_found, `schedule not provided`);

    // make sure picked seats are available for now
    const booked = await pris.reservation.aggregate({
      _count: true,
      where: {
        scheduleId: Number(scheduleId),
        date: new Date(date),
        seatId: {in: seatIds}
      }
    });
    if (booked._count > 0)
      throw helper.http.createError(
        http_status.gone,
        'session timeout: seats already be booked by someone else'
      );

    // create new reservation
    const ticketId = v4();
    await pris.reservation.createMany({
      data: seatIds.map(seatId => ({
        scheduleId: Number(scheduleId),
        date: new Date(date),
        userId,
        seatId,
        ticketId
      }))
    });

    const ticket = await pris.ticket.create({
      data: {
        id: ticketId,
        scheduleId: Number(scheduleId),
        date: new Date(date),
        seatIds: seatIds.join(', '),
        total: 0,
        status: ticket_status.waiting,
        expiredAt: moment().add(5, 'minutes').toDate(),
        passenger: passenger,
        phoneNumber: phoneNumber,
        email: email,
        note: note,
        createdDate: new Date(),
        userId
      }
    });

    return ticket.id;
  });
};

BookingService.revoke = async ticketId => {
  return await prisma.$transaction(async pris => {
    const ticket = pris.ticket.findUnique({
      where: {id: ticketId}
    });

    if (!ticket || [ticket_status.canceled, ticket_status.paid].includes(ticket.status))
      return;

    const delRes = await pris.$executeRaw`
      DELETE FROM reservation
      WHERE TicketId = ${ticketId}
    `;
    delRes > 0 && console.log(`Removed ${delRes} reservation`);

    const modRes = await pris.ticket.update({
      where: {id: ticketId},
      data: {status: ticket_status.canceled}
    });

    modRes > 0 && console.log(`Canceled ticket ${ticketId}`);
  });
};

export default BookingService;
