import {orm} from '~/config';
import {string} from '~/helpers';

const prisma = orm.getInstance();
const RefreshToken = {};

RefreshToken.add = async ({jwtId, refreshToken, userId}) => {
  return await prisma.refreshToken.create({
    data: {
      id: jwtId,
      hashedToken: string.hash(refreshToken),
      userId
    }
  });
};

RefreshToken.findById = async id => {
  return await prisma.refreshToken.findUnique({
    where: {
      id
    }
  });
};

RefreshToken.delete = async id => {
  return prisma.refreshToken.update({
    where: {
      id
    },
    data: {
      revoked: true
    }
  });
};

RefreshToken.revoke = userId => {
  return prisma.refreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
};

export default RefreshToken;
