const jwt = require('jsonwebtoken');


const authMiddleware = (req,res,next) => {


    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({

            'Success': false,
            'Message': 'Access denied. No token provided'
        });
        
    }

    const token = authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : authHeader;

    try {

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded;

        next();
        
    } catch (error) {

        return res.status(500).json({

            'Success': false,
            'Message': 'Invalid token.'

        });
        
    }

}

module.exports = authMiddleware;