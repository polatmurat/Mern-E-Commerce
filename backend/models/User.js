// ./models/User.js

// Define the User schema using a plain JavaScript object
const UserSchema = {
    name: {
        required: true,
        type: 'string'
    },
    email: {
        required: true,
        type: 'string'
    },
    password: {
        required: true,
        type: 'string'
    },
    admin: {
        required: true,
        type: 'boolean',
        default: false
    }
};

module.exports = UserSchema;
