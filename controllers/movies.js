const { ValidationError, CastError } = require('mongoose').Error;

const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав на удаление');
      }
      return movie.deleteOne();
    })
    .then((deletedMovie) => res.send(deletedMovie))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Предоставлены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
