const express = require('express');
const { signup, signin } = require('../controller/auth');
const { isRequestValidated, validateSignUpRequest, validateSignInRequest } = require('../validator/auth');
const router = express.Router();


router.post('/signup', validateSignUpRequest, isRequestValidated, signup);
router.post('/signin',validateSignInRequest, isRequestValidated, signin);







module.exports = router;