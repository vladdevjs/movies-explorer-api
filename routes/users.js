const express = require('express');

const router = express.Router();

const { getUserInfo, updateUserInfo } = require('../controllers/users');

const { validateUserInfo } = require('../helpers/validations');

router.get('/me', getUserInfo);

router.patch('/me', validateUserInfo, updateUserInfo);

module.exports = router;
