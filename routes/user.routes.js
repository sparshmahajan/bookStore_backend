const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {dataValidator} = require('../middlewares/dataValidator');

const { signup, login } = require('../controllers/user.controller');

router.post('/signup',
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('password').matches(/\d/).withMessage('Password must contain a number'),
    body('password').matches(/[A-Z]/).withMessage('Password must contain an uppercase letter'),
    body('password').matches(/[a-z]/).withMessage('Password must contain a lowercase letter'),
    body('password').matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'),
    body('name').not().isEmpty().withMessage('Name is required'),
    dataValidator, signup);

router.post('/login', login);

module.exports = router;