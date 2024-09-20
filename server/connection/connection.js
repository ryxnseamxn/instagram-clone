const sql = require("mssql"); 

let config = {
    "user": "sa", 
    "password": "DB_Password", 
    "server": "127.0.0.1", 
    "database": "instagram", 
    "options": {
        "encrypt": false,
        "port": 1433 
    }
}

sql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection Successful!");
});

const getUsers = async () => {
    try {
        const result = await sql.query(`SELECT * FROM dbo.users`);
        return result.recordset;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const addUser = async (username, password, email) => {
    console.log('AddUser');
    try {
        await sql.query(`
            INSERT INTO dbo.users (username, password, email)
            VALUES ('${username}', '${password}', '${email}')
        `);
        console.log(`User ${username} added successfully!`);
    } catch (err) {
        console.error('Error adding user:', err);
        throw err;
    }
};

const addPost = async (username, caption) => {
    let userID = await getUserIdByUsername(username); 
    if(!userID) {
        console.error('User not found', err)
        throw new Error('User not found'); 
    }
    try{
        await sql.query(`
            INSERT INTO dbo.posts (UserID, Username, Caption)
            VALUES ('${userID}', '${username}', '${caption}')
        `)
    }catch(err){
        console.error('Error adding post', err)
        throw err;         
    }
};

const getUserIdByUsername = async (username) => {
    try{
        const result = await sql.query(`SELECT dbo.users.userID FROM dbo.users WHERE username='${username}'`); 
        return result.recordset[0].userID; 
    }catch(err){
        console.error('Error getting userID by username', err)
        throw err; 
    }
}

module.exports = {
    getUsers,
    addUser, 
    getUserIdByUsername,
    addPost,

};