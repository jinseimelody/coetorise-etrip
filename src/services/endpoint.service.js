import {orm} from '~/config';

const prisma = orm.getInstace();
const EndpointService = {};

EndpointService.search = async ({q}) => {
  const pattern = `%${q}%`;
  return await prisma.$queryRaw`
    SELECT
      id
      , name
      , district
    FROM end_point
    WHERE name like ${pattern}
      OR district like ${pattern}
  `;
};

EndpointService.getOne = async endpointId => {
  return await prisma.endPoint.findUnique({
    where: {id: Number(endpointId)}
  });
};

export default EndpointService;
