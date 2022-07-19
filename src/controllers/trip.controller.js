import {orm} from '~/config';

const prisma = orm.getInstace();
const TripController = orm.getInstace();

TripController.getAll = async (_, res) => {
  const trips = await prisma.trip.findMany({
    include: {from: true, to: true}
  });
  console.log(trips);
  return res.json({data: trips});
};

export default TripController;
