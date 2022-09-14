const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');


//REGISTER
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        // !user && res.status(400).json("Wrong credentials !");
        if (!user) {
            res.status(404).json("User not found");
            return;
        }
        const validated = await bcrypt.compare(req.body.password, user.password);
        // !validated && res.status(400).json("Wrong credentials !");
        if (!validated) {
            res.status(404).json("Incorrect password");
            return;
        }
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(400).json(err);
    }
})



module.exports = router;
