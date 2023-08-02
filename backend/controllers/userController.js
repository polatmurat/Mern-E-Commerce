const { validationResult } = require('express-validator');
const connect = require('../config/db');
const User = require('../models/User');
const { hashedPassword, createToken, comparePassword } = require('../services/authService');

const register = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { name, email, password } = req.body;
        try {
            const client = await connect();

            const userCollection = client.db('ecommerce').collection('user');

            const emailExist = await userCollection.findOne({ email });

            if (!emailExist) {
                // User does not exist, proceed with registration

                const cryptedPassword = await hashedPassword(password);

                const user = new User(name, email, cryptedPassword, false);

                await userCollection.insertOne(user);

                const token = await createToken(user);

                return res.status(201).json({ msg: 'User registered successfully.', token: token });
            } else {
                return res.status(401).json({ errors: [{ msg: `${email} is already taken.` }] });
            }
        } catch (error) {
            console.log(error.message);
            return res.status(500).json("Server internal error!");
        }
    } else {
        // Validations failed
        return res.status(400).json({ errors: errors.array() });
    }
};

const login = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { email, password } = req.body;
        try {

            const client = await connect();

            const userCollection = client.db('ecommerce').collection('user');

            const user = await userCollection.findOne({ email: email });

            // console.log(user);

            if (user) {
                if (await comparePassword(password, user.password)) {
                    const token = await createToken(user);
                    if (user.admin) {
                        return res.status(201).json({ token: token, admin: true });
                    } else {
                        return res.status(201).json({ token, admin: false });
                    }
                } else {
                    return res.status(401).json({ errors: [{ 'msg': 'Password not matched. Login Failure!' }] })
                }
            } else {
                return res.status(401).json({ errors: [{ 'msg': `${email} is not found!` }] });
            }

        } catch (error) {
            console.log(error.message);
            return res.status(500).json("Server internal error!");
        }
    } else {
        // Validations failed
        return res.status(401).json({ errors: errors.array() });
    }
};

module.exports = { register, login };
