const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

exports.register = async (req,res) => {
    try {

        const {name,email,password,role} = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
            'Success': false,
            'Message': 'Fill all required fields'
            });
    
        }

        const existingUser = await User.findOne({
            where:{
                email
            }
        });

        if(existingUser)
        {
            return res.status(409).json({
            'Success': false,
            'Message': 'User already exists'
            });
        }

        const hashPassword = await bcrypt.hash(password,10);

        await User.create({
            name,
            email,
            password: hashPassword,
            role: role || 'student'

        });

        return res.status(200).json({
            'Success': true,
            'Message': 'User registered successfully'
        });     

        
    } catch (error) {

        console.error(error);

        return res.status(500).json({
            'Success': false,
            'Message': 'Server Error'
        })
        
    }
};

exports.login = async (req,res) => {

    try {

        const {email,password} = req.body;

        if (!email || !password) {

            return res.status(400).json({
            'Success': false,
            'Message': 'Email and password are required'
            });
    
        }
        
        const existingUser = await User.findOne({
            where:{
                email
            }
        });

        if(!existingUser)
        {
            return res.status(401).json({
            'Success': false,
            'Message': 'Invalid email or password.'
            });
        }

        const isPassword = await bcrypt.compare(password,existingUser.password)

        if (!isPassword) {

            return res.status(401).json({
            'Success': false,
            'Message': 'Invalid email or password.'
            });
        }

        const token = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.name,
                role: existingUser.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );


        return res.status(200).json({
            'Success': true,
            'Message': 'Login successful.',
            'Token': token,
            'User': {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.name,
                role: existingUser.role
            }
        });
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            'Success': false,
            'Message': 'Server Error'
        });
                
    }
   
};