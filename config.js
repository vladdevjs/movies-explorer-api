require('dotenv').config();

const {
  NODE_ENV, PORT, MONGODB_URI, JWT_SECRET,
} = process.env;

module.exports = {
  port: NODE_ENV === 'production' ? PORT : 3000,
  mongoURI:
    NODE_ENV === 'production'
      ? MONGODB_URI
      : 'mongodb://127.0.0.1:27017/bitfilmsdb',
  secretKey:
    NODE_ENV === 'production'
      ? JWT_SECRET
      : '3F3D6652CCCD9C4A61AA96EEBC88F4D9E5C26DF9C30004D40F9242654FA692D4',
};
