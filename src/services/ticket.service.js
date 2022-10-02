import {orm} from '~/config';

const prisma = orm.getInstance();
const TicketService = {};

TicketService.search = async ({userId, ticketId}) => {
  return await prisma.$queryRaw`
    SELECT 
      t.id,
      t.date,
      ba.busId,
      t.seatIds,
      dep.name as departure,
      arr.name as arrival,
      s.start,
      s.end,
      u.name,
      t.createdDate,
      t.expiredAt,
      t.status,
      t.total
    FROM ticket t
    INNER JOIN user u
      ON u.Id = t.UserId
    INNER JOIN schedule s
      ON s.Id = t.ScheduleId 
    INNER JOIN bus_assign ba 
	    ON ba.ScheduleId = s.Id
    INNER JOIN trip tt 
      ON tt.Id = s.TripId 
    INNER JOIN end_point dep
      ON tt.FromId = dep.Id
    INNER JOIN end_point arr
      ON tt.ToId = arr.Id
    WHERE
      t.userId = ${userId}
    ${ticketId ? orm.helper.sql`AND t.Id = ${ticketId}` : orm.helper.empty}
  `;
};

export default TicketService;
