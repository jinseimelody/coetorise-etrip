import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import {http_status} from './constant';

const jwt = {
  signAccessToken: async user => {
    const payload = {userId: user.id};
    const secret = process.env.JWT_ACCESS_SECRET;
    const options = {
      expiresIn: '10m',
      issuer: 'm.coetorise.com',
      audience: '' + user.id
    };
    const token = await jsonwebtoken.sign(payload, secret, options);
    return token;
  },
  signRefreshToken: async (user, jwtId) => {
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

    return await jsonwebtoken.sign(payload, secret, options);
  },
  signTokens: async function (user, jwtId) {
    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.signRefreshToken(user, jwtId);

    return {
      accessToken,
      refreshToken
    };
  },
  verify: jsonwebtoken.verify
};

const string = {
  hash: input => {
    return crypto.createHash('sha256').update(input).digest('hex');
  }
};

const http = {
  createError: (code = http_status.internal_server_error, message) => {
    const error = new Error(message);
    error.code = code;
    return error;
  }
};

export default Object.assign({jwt, string, http});
