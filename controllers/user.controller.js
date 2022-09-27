const userSchema = require('../models/userSchema');
const { Encrypt, Decrypt } = require('../security/bcrypt');
const { getToken } = require('../security/jwt');

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        const user = await userSchema.findOne({ email: email });
        if (user) {
            res.status(409).json({ message: 'User already exists' });
        } else {
            const encryptedPassword = await Encrypt(password);
            const newUser = new userSchema({
                name: name,
                email: email,
                password: encryptedPassword
            });
            const user = await newUser.save();
            res.status(201).json({
                message: 'User created successfully',
                userId: user._id,
                name: user.name,
                email: user.email
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userSchema.findOne({ email: email });
        if (user) {
            const decryptedPassword = await Decrypt(password, user.password);
            const token = await getToken(user._id.toString());
            if (decryptedPassword) {
                res.status(200).json({
                    message: 'User logged in successfully',
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                    token: token
                });
            } else {
                res.status(401).json({ message: 'Incorrect password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { signup, login };
