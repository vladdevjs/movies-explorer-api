const express = require('express');

const router = express.Router();

const { createUser, login, signout } = require('../controllers/users');

const { validateUserCreate, validateLogin } = require('../helpers/validations');

router.post('/signup', validateUserCreate, createUser);

router.post('/signin/', validateLogin, login);

router.post('/signout/', signout);

module.exports = router;
