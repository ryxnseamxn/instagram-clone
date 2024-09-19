const express = require('express');
const cors = require('cors'); 
const db = require('./connection/connection'); 

const app = express(); 

app.use(cors()); 
app.use(express.json()); 

app.get('/message', async (req, res) => {
    res.json({message: "Hello, world!"}); 
    // let result = await db.getUsers(); 
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

app.post('/addPost', async (req, res) => {
    const { username } = req.body;
    try{
        const result = await db.getUserIdByUsername(username); 
        if(!result){
            console.error('Error adding user', err);
            throw error; 
        }
        console.log(result[0].userID);
        res.status(200).json({ message: 'Post added successfully!' });
    }catch (err){
        res.status(500).json({ error: 'Failed to add post' });
    }
})

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
}); 