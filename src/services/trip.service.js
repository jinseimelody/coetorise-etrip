import {orm} from '~/config';

const prisma = orm.getInstace();
const TripService = {};

TripService.search = async ({
  from,
  to,
  date,
  time,
  layoutId,
  nonBookedCount,
  sortBy,
  sortType,
  pageNumber
}) => {
  // finding the schedule is which has day off is search date
  const scheduleOffs = await prisma.$queryRaw`
    SELECT
      s.Id
    FROM day_off do
    INNER JOIN  schedule s
      ON s.Id = do.ScheduleId
    WHERE do.Date = ${date}
  `;

  const pageSize = 5;
  const offSet = pageNumber == 1 ? 0 : pageSize * pageNumber;
  const query = orm.helper.sql`
    WITH seat_count AS (
      SELECT s.Id
        , ba.BusId
        , ba.Price
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
            ? orm.helper.sql` AND s.Id NOT IN (${orm.helper.join(
                scheduleOffs.map(x => x.id)
              )})`
            : orm.helper.empty
        }
      INNER JOIN bus b
        ON b.Id = ba.BusId
      INNER JOIN seat_on_layout sol
        ON sol.LayoutId = b.LayoutId
      LEFT JOIN reservation tk
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
      , sc.price
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
    WHERE true
    ${
      time === 'early_morning'
        ? orm.helper.sql`AND s.Start BETWEEN '00:00:00' AND '06:00:00'`
        : orm.helper.empty
    }
    ${
      time === 'morning'
        ? orm.helper.sql`AND s.Start BETWEEN '06:01:00' AND '12:00:00'`
        : orm.helper.empty
    }
    ${
      time === 'afternoon'
        ? orm.helper.sql`AND s.Start BETWEEN '12:01:00' AND '18:00:00'`
        : orm.helper.empty
    }
    ${
      time === 'night'
        ? orm.helper.sql`AND s.Start BETWEEN '18:01:00' AND '23:59:00'`
        : orm.helper.empty
    }
    ${layoutId ? orm.helper.sql`AND sc.layoutId = ${layoutId}` : orm.helper.empty}
    ${
      nonBookedCount
        ? orm.helper.sql`AND sc.nonBookedCount >= ${nonBookedCount}`
        : orm.helper.empty
    }
    ${
      [undefined, 'default'].includes(sortBy)
        ? orm.helper.sql`ORDER BY s.Start`
        : orm.helper.empty
    }
    ${
      sortBy === 'price' && ['asc', 'default'].includes(sortType)
        ? orm.helper.sql`ORDER BY sc.price ASC`
        : orm.helper.empty
    }
    ${
      sortBy === 'price' && sortType === 'desc'
        ? orm.helper.sql`ORDER BY sc.price DESC`
        : orm.helper.empty
    }
    LIMIT ${pageSize} OFFSET ${offSet}
  `;

  return await prisma.$queryRaw(query);
};

TripService.getOne = async ({scheduleId, date}) => {
  // determine which trip and bus assigned to this schedule
  const general = await prisma.$queryRaw`
    SELECT
      ba.busId
      , b.layoutId
      , ba.price
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
      , IF(t.Id IS NOT NULL, false, true) AS available
    FROM
      bus_assign ba
    INNER JOIN bus b
      ON ba.ScheduleId = ${scheduleId}
      AND ba.BusId = b.Id
    INNER JOIN seat_on_layout sol
      ON sol.LayoutId = b.LayoutId
    LEFT JOIN reservation t
      ON t.Date = ${date}
      AND t.ScheduleId = ba.ScheduleId
      AND t.SeatId = sol.Id
  `;
  return Object.assign(...general, {seats: seats});
};

export default TripService;
