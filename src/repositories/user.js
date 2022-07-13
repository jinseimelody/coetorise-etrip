import {Orm} from '~/config';

const prisma = Orm.getInstace();
const User = {};
User.findByEmail = async email => {
  const user = await prisma.User.findFirst({
    where: {
      email
    }
  });
  return user;
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

User.generateAuthToken = () => {};

export default User;
