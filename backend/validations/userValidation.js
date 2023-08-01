const { body } = require('express-validator');

const registerValidations = [
    body('name').not().isEmpty().trim().escape().withMessage('The name field cannot be left blank!'),
    body('email').isEmail().normalizeEmail().trim().withMessage('Please enter a valid email!'),
    body('password').isLength({ min: 6 }).trim().withMessage('Password must be at least 6 characters!')
];

const loginValidations = [
    body('email').isEmail().normalizeEmail().trim().withMessage('Please enter a valid email!'),
    body('password').not().isEmpty().withMessage('Password is required!')
];

module.exports = { registerValidations, loginValidations };