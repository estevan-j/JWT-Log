const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");


const authenticationMiddleware  = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startWith('Bearer ')){
        throw new UnauthenticatedError('No token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id , usename } = decoded;
        req.user = {id, usename};
        next();      
    } catch (error) {
        throw new  UnauthenticatedError('No authorized to access this route');
    }

}


module.exports = authenticationMiddleware;