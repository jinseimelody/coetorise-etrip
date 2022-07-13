import crypto from 'crypto';

const string = {};

string.hash = input => {
  return crypto.createHash('sha512').update(input).digest('hex');
};

export default string;
