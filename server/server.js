const express = require('express');
const cors = require('cors'); 
const multer = require("multer");
const db = require('./connection/connection'); 
const upload = multer({ storage: multer.memoryStorage() });

const app = express(); 

app.use(cors()); 
app.use(express.json()); 

app.get('/message', async (req, res) => {
    res.json({message: "Hello, world!"}); 
    // let result = await db.getUsers(); 
});

app.get('/posts', async (req, res) => {
    const username = req.query.username;
    const userPosts = await db.getPostsForUser(username);
  
    res.json(userPosts);
  });

app.post('/addUser', async (req, res) => {
    const { username, password, email } = req.body;

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
        await db.addPost(username, caption, req.file.buffer)
        res.status(200).json({ message: 'Post added successfully!' });
    }catch (err){
        res.status(500).json({ error: 'Failed to add post' });
    }
})

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