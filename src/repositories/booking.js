import {orm} from '~/config';

const prisma = orm.getInstace();
const Booking = {};

Booking.findTrips = async ({from, to, date}) => {
  return await prisma.$queryRaw`
    WITH except_schedule AS (
        SELECT
            s.Id 
        FROM day_off do
        INNER JOIN  schedule s
            ON s.Id = do.ScheduleId
        WHERE do.Date = ${date}
    ),
    seat_count AS (
        SELECT s.Id
        , ba.BusId
        , count(s.id) AS NonBookedCount
        FROM trip t
        INNER JOIN schedule s
            ON t.Id = s.TripId
            AND t.FromId = ${from}
            AND t.ToId = ${to}
            AND (s.CronType = 'Daily' OR s.Date = ${date})
        INNER JOIN bus_assign ba
            ON s.Id = ba.ScheduleId AND s.Id NOT IN (SELECT * FROM except_schedule)
        INNER JOIN bus b
            ON b.Id = ba.BusId
        INNER JOIN seat_on_layout sol
            ON sol.LayoutId = b.LayoutId
        LEFT JOIN booking bk
            ON s.Id = bk.ScheduleId
            AND bk.SeatId = sol.Id
            AND bk.Date = ${date}
        WHERE bk.Id IS NULL
        GROUP BY s.Id, ba.BusId
    )
    SELECT 
        s.Id
        , s.Start
        , s.End
        , s.Cron
        , s.CronType
        , s.Date
        , fep.Name AS 'From'
        , eep.Name AS 'To'
        , t.Distance
        , t.TravelTime
        , sc.BusId
        , sc.NonBookedCount
    FROM seat_count sc
    INNER JOIN schedule s 
        ON s.id = sc.id
    INNER JOIN trip t
        ON t.Id = s.TripId
    INNER JOIN end_point fep
        ON fep.Id = t.FromId
    INNER JOIN end_point eep
        ON eep.Id = t.ToId`;
};

Booking.findSeats = async ({scheduleId, date}) => {
  return await prisma.$queryRaw`
    SELECT DISTINCT
        sol.Id as SeatId
        , bk.Id as BookingId
    FROM
        bus_assign ba
    INNER JOIN bus b 
        ON ba.ScheduleId = ${scheduleId}
        AND ba.BusId = b.Id
    INNER JOIN seat_on_layout sol 
        ON sol.LayoutId = b.LayoutId 
    LEFT JOIN booking bk
        ON bk.Date = ${date}
        AND bk.ScheduleId = ba.ScheduleId
        AND bk.SeatId = sol.Id`;
};

export default Booking;
