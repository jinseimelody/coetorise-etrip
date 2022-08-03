import {orm} from '~/config';

const prisma = orm.getInstace();
const TripService = {};

TripService.search = async ({from, to, date}) => {
  // finding the schedule is which has day off is search date
  const scheduleOffs = await prisma.$queryRaw`
    SELECT
      s.Id
    FROM day_off do
    INNER JOIN  schedule s
      ON s.Id = do.ScheduleId
    WHERE do.Date = ${date}
  `;

  const query = orm.helper.sql`
    WITH seat_count AS (
      SELECT s.Id
        , ba.BusId
        , b.LayoutId
        , count(s.id) AS nonBookedCount
      FROM trip t
      INNER JOIN schedule s
        ON t.Id = s.TripId
        AND t.FromId = ${from}
        AND t.ToId = ${to}
        AND (s.CronType = 'Daily' OR s.Date = ${date})
      INNER JOIN bus_assign ba
        ON s.Id = ba.ScheduleId
        ${
          scheduleOffs.length > 0
            ? orm.helper.sql`AND s.Id NOT IN ${orm.helper.join(
                scheduleOffs.map(x => x.id)
              )}`
            : orm.helper.empty
        }
      INNER JOIN bus b
        ON b.Id = ba.BusId
      INNER JOIN seat_on_layout sol
        ON sol.LayoutId = b.LayoutId
      LEFT JOIN ticket tk
        ON s.Id = tk.ScheduleId
        AND tk.SeatId = sol.Id
        AND tk.Date = ${date}
      WHERE tk.Id IS NULL
      GROUP BY s.Id, ba.BusId, b.LayoutId
    )
    SELECT
      s.Id as scheduleId
      , s.start
      , s.end
      , s.cron
      , s.cronType
      , s.date
      , fep.Name AS 'from'
      , eep.Name AS 'to'
      , t.distance
      , t.travelTime
      , t.price
      , sc.busId
      , sc.layoutId
      , sc.nonBookedCount
    FROM seat_count sc
    INNER JOIN schedule s
      ON s.id = sc.id
    INNER JOIN trip t
      ON t.Id = s.TripId
    INNER JOIN end_point fep
      ON fep.Id = t.FromId
    INNER JOIN end_point eep
      ON eep.Id = t.ToId
  `;
  return await prisma.$queryRaw(query);
};

TripService.getOne = async ({scheduleId, date}) => {
  // determine which trip and bus assigned to this schedule
  const general = await prisma.$queryRaw`
    SELECT
      s.id as scheduleId
      , ${date} as date
      , ba.busId
      , b.layoutId
      , t.price
    FROM schedule s
    INNER JOIN trip t
      ON t.id = s.tripId
      AND s.id = ${scheduleId}
    INNER JOIN bus_assign ba
      ON ba.scheduleId = s.id
    INNER JOIN bus b
      ON b.id = ba.busId
  `;

  const seats = await prisma.$queryRaw`
    SELECT
      sol.Id as seatId
      , IF(t.Id IS NOT NULL, false, true) AS avaliable
    FROM
      bus_assign ba
    INNER JOIN bus b
      ON ba.ScheduleId = ${scheduleId}
      AND ba.BusId = b.Id
    INNER JOIN seat_on_layout sol
      ON sol.LayoutId = b.LayoutId
    LEFT JOIN ticket t
      ON t.Date = ${date}
      AND t.ScheduleId = ba.ScheduleId
      AND t.SeatId = sol.Id
  `;
  return Object.assign(...general, {seats: seats});
};

export default TripService;
