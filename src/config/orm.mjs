import {PrismaClient} from '@prisma/client';

const prismaConfig = {
  log: ['query', 'error']
};

const orm = {};

orm.getInstace = () => {
  if (orm.instance) return orm.instance;

  orm.instance = new PrismaClient(prismaConfig);
  return orm.instance;
};

export default orm;
