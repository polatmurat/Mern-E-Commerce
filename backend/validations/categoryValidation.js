const {body} = require('express-validator');

const categoryValidations = [
    body('name').not().isEmpty().trim().escape().withMessage('The category field cannot be left blank!'),
];

module.exports = {categoryValidations};