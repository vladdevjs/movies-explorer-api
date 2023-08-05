const { ValidationError, CastError } = require('mongoose').Error;

const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  forbiddenMessage,
  movieNotFoundMessage,
  badRequestMessage,
} = require('../helpers/errorMessages');

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
        console.error(err);
        next(new BadRequestError(err.message));
      } else {
        console.error(err);
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(movieNotFoundMessage))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenMessage);
      }
      return movie.deleteOne();
    })
    .then((deletedMovie) => res.send(deletedMovie))
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError(badRequestMessage));
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
