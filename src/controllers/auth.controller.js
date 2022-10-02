import {v4} from 'uuid';
import {orm} from '~/config';
import {validationSchema, helper, http_status} from '~/common';

const prisma = orm.getInstance();
const AuthController = {};

AuthController.login = async (req, res) => {
  const {email, password} = req.body;
  const result = validationSchema.auth.login.validate(req.body);
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

  const jwtId = v4();
  const {accessToken, refreshToken} = await helper.jwt.signTokens(user, jwtId);
  await prisma.refreshToken.create({
    data: {
      id: jwtId,
      hashedToken: helper.string.hash(refreshToken),
      userId: user.id
    }
  });

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 8 * 60 * 60 * 1000
  });
  return res.json({
    status: http_status.ok,
    data: {userName: user.name, accessToken}
  });
};

export default AuthController;
