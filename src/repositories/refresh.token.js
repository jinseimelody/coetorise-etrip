import {Orm} from '~/config';
import {String} from '~/helpers';

const prisma = Orm.getInstace();
const RefreshToken = {};

RefreshToken.add = async ({jti, refreshToken, userId}) => {
  return prisma.refreshToken.create({
    data: {
      id: jti,
      hashedToken: String.hash(refreshToken),
      userId
    }
  });
};

RefreshToken.findById = async id => {
  return prisma.refreshToken.findUnique({
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
