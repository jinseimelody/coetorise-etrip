import {PrismaClient} from '@prisma/client';
import {string} from '~/helpers';

const prismaConfig = {
  log: ['error']
};

const orm = {};

orm.getInstace = () => {
  if (orm.instance) {
    return orm.instance;
  }

  orm.instance = new PrismaClient(prismaConfig);
  return orm.instance;
};

export default orm;
