import {v4} from 'uuid';
import {orm} from '~/config';
import {validationSchema, helper, http_status} from '~/common';

const prisma = orm.getInstance();
const UserController = {};

UserController.register = async (req, res) => {
  let {name, email, password} = req.body;
  // model validation
  const result = validationSchema.user.register.validate(req.body);
  if (result.error) throw result.error;

  const token = await prisma.$transaction(async pris => {
    // make sure email not registered
    const registered = await pris.user.findFirst({where: {email}});
    if (registered) throw new Error(`${email} is already been registered`);

    // create new user
    const user = await pris.user.create({
      data: {name: name ?? email, email, password: helper.string.hash(password)}
    });

    // create token
    const jwtId = v4();
    const token = await helper.jwt.signTokens(user, jwtId);
    await pris.refreshToken.create({
      data: {
        id: jwtId,
        hashedToken: helper.string.hash(token.refreshToken),
        userId: user.id
      }
    });

    return token;
  });

  return res.json(token);
};

UserController.login = async (req, res) => {
  const {email, password} = req.body;
  // model validation
  const result = validationSchema.user.login.validate(req.body);
  if (result.error) throw result.error;

  // make sure authentication credentials is correct
  const user = await prisma.user.findUnique({
    where: {unique: {email, password: helper.string.hash(password)}}
  });

  if (!user)
    throw helper.http.createError(
      http_status.unauthorized,
      'Incorrect username or password.'
    );

  // create token
  const jwtId = v4();
  const token = await helper.jwt.signTokens(user, jwtId);
  await prisma.refreshToken.create({
    data: {
      id: jwtId,
      hashedToken: helper.string.hash(token.refreshToken),
      userId: user.id
    }
  });
  return res.json(token);
};

UserController.logout = async (req, res) => {
  const {refreshToken} = req.body;
  if (!refreshToken) {
    res.status(400);
    throw new Error('Bad request');
  }

  const payload = await helper.jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  await prisma.refreshToken.delete({
    where: {id: payload.jwtId}
  });
};

UserController.refreshToken = async (req, res) => {
  const {refreshToken} = req.body;
  // model validation
  if (!refreshToken) {
    res.status(400);
    throw new Error('Missing refresh token.');
  }

  // make sure token valid
  const payload = helper.jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const token = await prisma.refreshToken.findUnique({
    where: {id: payload.jwtId}
  });

  if (!token || token.revoked || token.hashedToken !== helper.string.hash(refreshToken)) {
    res.status(401);
    throw new Error('Unauthorized token');
  }

  // make sure user registered
  const user = await prisma.user.findUnique({
    where: {id: payload.userId}
  });
  if (!user) {
    res.status(401);
    throw new Error('Unauthorized user');
  }

  // create new refresh token
  await prisma.$transaction(async pris => {
    await pris.refreshToken.delete({
      where: {id: payload.jwtId}
    });

    const jwtId = v4();
    const token = await helper.jwt.signTokens(user, jwtId);
    await pris.refreshToken.create({
      data: {
        id: jwtId,
        hashedToken: helper.string.hash(token.refreshToken),
        userId: user.id
      }
    });

    return res.json(token);
  });
};

export default UserController;
