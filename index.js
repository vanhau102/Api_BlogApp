const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');

const dotenv = require('dotenv');
const app = express();

//UPLOAD FILE 
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, "trandan.jpg");
    }
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been upload");
})


dotenv.config({ path: path.join(__dirname, './config.env') });
app.use(express.json());

// Connect MongoDB
async function DB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/react_blog');
        console.log('Connection to MongoDB is successfuly');
    } catch (err) {
        console.log('Error connecting to MongoDB', err);
    }
}
DB();

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

const post = 5000;
app.listen(post, () => {
    console.log(`Backend is running http://localhost:${post}`);
})