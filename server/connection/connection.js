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
    try {
        const result = await sql.query(`
            INSERT INTO dbo.users (username, password, email)
            VALUES ('${username}', '${password}', '${email}')
        `);
        
        console.log(`User ${username} added successfully!`);
    } catch (err) {
        console.error('Error adding user:', err);
        throw err;
    }
};

module.exports = {
    getUsers,
    addUser, 

};