const express = require('express');
const cors = require('cors'); 
const db = require('./connection/connection'); 

const app = express(); 

app.use(cors()); 
app.use(express.json()); 

app.get('/message', async (req, res) => {
    res.json({message: "Hello, world!"}); 
    let result = await db.getUsers(); 
    console.log(result); 
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
}); 