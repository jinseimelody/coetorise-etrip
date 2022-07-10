import {PrismaClient} from '@prisma/client';

const prismaConfig = {
  log: ['error']
};

const Orm = {};

Orm.getInstace = () => {
  if (Orm.instance) return Orm.instance;

  Orm.instance = new PrismaClient(prismaConfig);
  return Orm.instance;
};

export default Orm;
