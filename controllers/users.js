const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('mongoose').Error;
const { secretKey } = require('../config');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const {
  conflictMessage,
  userNotFoundMessage,
  badRequestMessage,
} = require('../helpers/errorMessages');

const User = require('../models/user');

const getUserInfo = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .select('email name')
    .orFail(new NotFoundError(userNotFoundMessage))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true }
  )
    .orFail(new NotFoundError(userNotFoundMessage))
    .then((updatedUser) => res.send(updatedUser))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(badRequestMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(conflictMessage));
      } else {
        next(err);
      }
    });
};

const setJwtCookie = (res, userId) => {
  const token = jwt.sign({ _id: userId }, secretKey, {
    expiresIn: '7d',
  });
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 3600000 * 24 * 7,
    sameSite: 'none',
    secure: true,
  });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        name,
        email,
        password: hashedPassword,
      })
    )
    .then((user) => {
      setJwtCookie(res, user._id);
      // eslint-disable-next-line no-shadow
      const { _id, email, name } = user;
      res.status(201).send({ _id, email, name });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(badRequestMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(conflictMessage));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      setJwtCookie(res, user._id);
      // eslint-disable-next-line no-shadow
      const { _id, email, name } = user;
      res.send({ _id, email, name });
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.json({ message: 'Вы успешно вышли' });
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
  signout,
};
