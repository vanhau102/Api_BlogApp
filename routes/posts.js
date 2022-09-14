const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

//CREATE POST
router.post("/", async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE POST 
router.patch("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    try {
        if (req.body.username === post.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true });
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can update only your post!");
        }


    } catch (err) {
        res.status(500).json(err);
    }
});
//DELETE POST
router.delete("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    try {
        if (req.body.username === post.username) {
            try {
                await post.delete();
                res.status(200).json("Post has been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can deleted only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});
//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({
                categories: { $in: [catName] },
            })
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;
