import jwt from 'jsonwebtoken';

const signAccessToken = async user => {
  const payload = {userId: user.id};
  const secret = process.env.JWT_ACCESS_SECRET;
  const options = {
    expiresIn: '10m',
    issuer: 'm.coetorise.com',
    audience: '' + user.id
  };
  const token = await jwt.sign(payload, secret, options);
  return token;
};

const signRefreshToken = async (user, jwtId) => {
  const payload = {
    userId: user.id,
    jwtId
  };
  const secret = process.env.JWT_REFRESH_SECRET;
  const options = {
    expiresIn: '8h',
    issuer: 'm.coetorise.com',
    audience: '' + user.id
  };

  return await jwt.sign(payload, secret, options);
};

const signTokens = async (user, jwtId) => {
  const accessToken = await signAccessToken(user);
  const refreshToken = await signRefreshToken(user, jwtId);

  return {
    accessToken,
    refreshToken
  };
};

export default Object.assign(
  {},
  {
    verify: jwt.verify,
    signAccessToken,
    signRefreshToken,
    signTokens
  }
);
