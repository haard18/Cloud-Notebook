const jwt = require("jsonwebtoken");
const JWT_SECRET = 'Thisisa$ecret$tring'

const fetchuser = (req, res, next) => {
    //Middleware is used to make a bridge between getting and decoding the user id from user information
    //it is helping the reusability
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using valid token" });

    }
    try {

        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate for login" })
    }
}
module.exports = fetchuser;