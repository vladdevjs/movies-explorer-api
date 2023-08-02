const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
  message: 'Слишком много запросов, хватит спамить уже!',
});

module.exports = limiter;
