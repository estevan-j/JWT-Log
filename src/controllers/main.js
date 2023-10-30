const { BadRequestError } = require("../errors");
const CustomAPIError = require("../errors");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {username, password} = req.body;

    // mongo
    // JOI
    // check in the controleer
    if ( !username || !password){
        throw new BadRequestError('Please provide email and password');
    }
    
    // just for demo, normally provided by DB!!!
    const id = new Date().getDate();

    // TRY to keep payload small, better experiencie for user.
    // just for demo, in producction use long, complex and unguessable string value!!!
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '4d'})

    res.status(200).json({ msg: 'user created',token })
}


const dashboard = async (req, res) => {
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).send({ 
        msg: `Hello, ${req.user.username}`, 
        secret: `Here is your authorized data, you r lucky
    number is ${luckyNumber}` })
    
}

module.exports = {
    login, dashboard
}