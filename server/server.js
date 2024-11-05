const cors = require('cors'); 
const multer = require("multer");
const express = require('express');
const cookieParser = require('cookie-parser'); 
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./connection/connection'); 


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

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json()); 
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads')); 

app.get('/posts', async (req, res) => {
    let token = req.cookies.token; 
    const { username } = jwt.decode(token); 
    const userPosts = await db.getPostsForUser(username);
    const followerCount = await db.getFollowersForUser(username); 
    const followingCount = await db.getFollowingForUser(username); 

    res.status(200).json({username, userPosts, followerCount, followingCount});
});

app.get('/feed', async (req, res) => {
    let token = req.cookies.token; 
    const { username } = jwt.decode(token); 
    const posts = await db.getFollowingPostsForUser(username); 
    res.status(200).json({posts}); 
});

app.get('/user/:username', async (req, res) => {
    const { username } = req.params;  
    try {
        const userPosts = await db.getPostsForUser(username);
        const followerCount = await db.getFollowersForUser(username); 
        const followingCount = await db.getFollowingForUser(username); 

        res.status(200).json({ userPosts, followerCount, followingCount });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



app.post('/logout', (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false, // set to true if using HTTPS in production
            sameSite: 'lax',
            path: '/'
        });
            
        res.status(200).json({ message: 'Logged out successfully' });
    } catch(err) {
        console.error('Logout error:', err);
        res.status(500).json({error: 'failed to signout'}); 
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;         
        let token = jwt.sign({ username: username, password: password }, process.env.SECRET); 
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, 
            sameSite: 'lax',
            path: '/'
        });
        
        res.status(200).json({ message: 'Login successful' });
    } catch(err) {
        console.error('Login error:', err);
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

app.post('/addPostForm', upload.single("image"), async (req, res) => {
    const { username, caption } = req.body;
    try{
        await db.addPost(username, caption, req.file.path); 
        res.status(200).json({ message: 'Post added successfully!' });
    }catch (err){
        res.status(500).json({ error: 'Failed to add post' });
    }
});

app.post('/addPost', upload.single("image"), async (req, res) => {
    let token = req.cookies.token; 
    const { username } = jwt.decode(token); 
    const { caption } = req.body;
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