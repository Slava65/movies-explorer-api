const movieRouter = require('express').Router();
const createMovieValidator = require('../validators/createMovieValidator');
const deleteMovieValidator = require('../validators/deleteMovieValidator');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);

movieRouter.post('/', createMovieValidator, createMovie);

movieRouter.delete('/:movieId', deleteMovieValidator, deleteMovie);

module.exports = movieRouter;
