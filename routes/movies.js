const express = require('express');

const router = express.Router();

const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validateMovieData,
  validateMovieId,
} = require('../helpers/validations');

router.get('/', getAllMovies);

router.post('/', validateMovieData, createMovie);

router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
