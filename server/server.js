const cors = require('cors'); 
const multer = require("multer");
const express = require('express');
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./connection/connection'); 
const { body, validationResult } = require("express-validator");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

const app = express(); 

app.use(cors()); 
app.use(express.json()); 
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads')); 

app.get('/posts', async (req, res) => {
    const username = req.query.username;
    const userPosts = await db.getPostsForUser(username);
    const followerCount = await db.getFollowersForUser(username); 
    const followingCount = await db.getFollowingForUser(username); 
  
    res.status(200).json({userPosts, followerCount, followingCount});
  });

app.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body;         
        let token = jwt.sign({ username: username, password: password }, process.env.SECRET); 
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful' });
    }catch(err){
        res.status(500).json({ error: 'failed to login' });
    }
});

app.post('/addUser', async (req, res) => {
    // const { username, email, password } = req.body;
    console.log(req.body.password);
    try {
        await db.addUser(username, password, email);
        res.status(200).json({ message: 'User added successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});

app.post('/addPost', upload.single("image"), async (req, res) => {
    const { username, caption } = req.body;
    try{
        await db.addPost(username, caption, req.file.path); 
        res.status(200).json({ message: 'Post added successfully!' });
    }catch (err){
        res.status(500).json({ error: 'Failed to add post' });
    }
});

app.post('/addFollower', async (req, res) => {
    const { follower, following} = req.body; 
    try{
        await db.addFollower(follower, following)
        res.status(200).json({ message: 'Follower added successfully!' });
    }catch (err){
        res.status(500).json({ error: 'Failed to add Follower' });
    }
})

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
}); 