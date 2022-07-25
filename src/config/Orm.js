import {PrismaClient, Prisma} from '@prisma/client';

const prismaConfig = {
  log: ['error']
};

const orm = {};

orm.getInstace = () => {
  if (orm.instance) {
    return orm.instance;
  }

  orm.instance = new PrismaClient(prismaConfig);
  orm.helper = {...Prisma};
  return orm.instance;
};

export default orm;
