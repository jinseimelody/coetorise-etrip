import crypto from 'crypto';

const string = {};

string.hash = input => {
  return crypto.createHash('sha256').update(input).digest('hex');
};

export default string;
