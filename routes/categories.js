const express = require('express');
const Category = require('../models/Category');
const Post = require('../models/Post');
const router = express.Router();

//CREATE CATEGORY
router.post("/", async (req, res) => {
    try {
        const newCat = await Category.create(req.body);
        res.status(200).json(newCat);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET 
router.get("/", async (req, res) => {
    try {
        const cat = await Category.find();
        res.status(200).json(cat);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
