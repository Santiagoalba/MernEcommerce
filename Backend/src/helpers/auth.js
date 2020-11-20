const jwt = require("jsonwebtoken");

const helpers = {};

helpers.authenticated = (req, res, next) => {

    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    } else {
        return res.status(400).json({ message: 'Authentication required.'});
    }

    next();
}

helpers.isAdmin = (req, res, next) => {
    console.log(req.user);
    if(req.user.role !== 'admin'){
        return res.status(400).json({ message: 'Access denied' });
    }
    next();
}

module.exports = helpers;