const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
router.post("/createuser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
    body('name').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            location: req.body.location,
            isAdmin: req.body.isAdmin ?? false

        })
        res.json({ success: true })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false })
    }



})
router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    let email = req.body.email;



    try {
        let userData = await User.findOne({email}); 
        if (!userData) {
            return res.status(400).json({ errors: "try again" })
        }
        if (req.body.password !== userData.password) {
            return res.status(400).json({ errors: "try again" })

        }
        return res.json({ success: true, userData: userData })




    }
    catch (error) {
        console.log(error)
        res.json({ success: false })
    }



})
module.exports = router;
