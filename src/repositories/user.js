import {orm} from '~/config';

const prisma = orm.getInstace();
const User = {};

User.findByEmail = async email => {
  return await prisma.User.findFirst({
    where: {
      email
    }
  });
};

User.findByCredential = async (email, password) => {
  const user = await prisma.User.findUnique({
    where: {
      unique: {
        email,
        password
      }
    }
  });
  return user;
};

export default User;
