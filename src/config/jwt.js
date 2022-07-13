import jwt from 'jsonwebtoken';

const signAccessToken = user => {
  const payload = {userId: user.id};
  const secret = process.env.JWT_ACCESS_SECRET;
  const options = {
    expiresIn: '30m',
    issuer: 'pickurpage.com',
    audience: user.id
  };
  return jwt.sign(payload, secret, options, (err, token) => {
    if (err) {
      console.log(err.message)
      reject(createError.InternalServerError())
      return
    }
    resolve(token)
  });
};

const generateRefreshToken = (user, jwtId) => {
  return jwt.sign(
    {
      userId: user.id,
      jwtId
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '8h'
    }
  );
};

const generateTokens = (user, jwtId) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jwtId);

  return {
    accessToken,
    refreshToken
  };
};

export {generateAccessToken, generateRefreshToken, generateTokens};
