const router = require('express').Router();

const auth = require('../middlewares/auth');

const authRoutes = require('./auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');

router.use('/', authRoutes);
router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

module.exports = router;
