const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const User = require("../Models_database/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'Thisisa$ecret$tring'
const fetchuser = require("../middleware/fetchuser")
//Route 1 Create a user using POST "/api/auth" does not require auth
router.post('/createuser',
    [
        body('name', 'Enter a valid name').notEmpty().isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Enter password longer than 4').isLength({ min: 4 })
    ], async (req, res) => {
        let success=false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        //Trying to check if user already exists if exists then error message
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: "User with this email exists please log in" })
            }
            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password, salt)
            //Creating a user with promise
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id,
                }
            }
            const auth_token = jwt.sign(data, JWT_SECRET)
            console.log(auth_token)
            res.json({success:true, auth_token })
        } catch (error) {
            console.log(error);
            res.status(500).send("Some error occured")
        }
    })
//ROUTE 2 Authenticate a user using POST: "/api/auth/login" does not require auth
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'password cannot be blank').exists(),
], async (req, res) => {
    let success=false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success=false
            return res.status(400).json({ error: "invalid credentials" });

        }
        const password_compare = await bcrypt.compare(password, user.password)
        if (!password_compare) {
            success=false;
            return res.status(400).json({ error: "invalid credentials" });
        }
        const data = {
            user: {
                id: user.id,
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET)
        success=true;
        res.json({success,auth_token});
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})
//Route 3 Get the user of Loginned user/ POST /api/auth/getuser
router.post('/getuser', fetchuser,async (req, res) => {

        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        } catch (error) {
            console.log(error);
            res.status(500).send("Some error occured")

        }
    })
module.exports = router;
