const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const handleError = require('./middlewares/handleError');
const routes = require('./routes/index');
const notFound = require('./middlewares/notFound');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { port, mongoURI } = require('./config');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
});

app.use(limiter);
app.use(requestLogger);
app.use(routes);
app.use('*', notFound);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
