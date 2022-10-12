import {helper, http_status} from '~/common';
import {orm} from '~/config';

const prisma = orm.getInstance();
const EndpointService = {};

EndpointService.getOne = async endpointId => {
  return await prisma.endPoint.findUnique({
    where: {id: Number(endpointId)}
  });
};

EndpointService.create = async ({name, district}) => {
  return await prisma.$transaction(async pris => {
    const duplicates = await pris.endPoint.findMany({
      where: {name}
    });

    if (duplicates.length)
      throw helper.http.createError(
        http_status.conflict,
        'End point name should not be duplicate'
      );

    return await pris.endPoint.create({
      data: {name: name, district: district, createdDate: new Date()}
    });
  });
};

EndpointService.update = async ({id, name, district}) => {
  return await prisma.$transaction(async pris => {
    return await pris.endPoint.update({
      where: {id: Number(id)},
      data: {
        name,
        district
      }
    });
  });
};

EndpointService.delete = async ids => {
  return await prisma.$transaction(async pris => {
    const trips = await pris.trip.aggregate({
      _count: true,
      where: {
        OR: [
          {
            fromId: {in: ids}
          },
          {
            toId: {in: ids}
          }
        ]
      }
    });

    if (trips._count > 0)
      throw helper.http.createError(
        http_status.conflict,
        'Endpoint had been includes by other trips'
      );

    return await pris.endPoint.deleteMany({
      where: {id: {in: ids.map(x => Number(x))}}
    });
  });
};

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

export default EndpointService;
