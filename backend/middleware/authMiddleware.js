const jwt = require("jsonwebtoken");

const verifyToken =
(req, res, next) => {

    const authHeader =
    req.headers.authorization;

    console.log(
        "Authorization Header:",
        authHeader
    );

    if (!authHeader) {

        return res
        .status(401)
        .json({
            message:
            "Access Denied"
        });
    }

    const token =
    authHeader.split(" ")[1];

    try {

        const decoded =
        jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log(
            "Decoded User:",
            decoded
        );

        req.user =
        decoded;

        next();

    } catch (error) {

        console.log(
            "JWT Error:",
            error
        );

        return res
        .status(400)
        .json({
            message:
            "Invalid Token"
        });
    }
};

module.exports =
verifyToken;