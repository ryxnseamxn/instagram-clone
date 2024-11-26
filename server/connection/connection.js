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
};

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

const getPostsForUser = async (username) => {
    try {
        const result = await sql.query(`SELECT * FROM dbo.Posts WHERE Username = '${username}'`);
        return result.recordset;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getFollowersForUser = async (username) => {
    try {
        let userID = await getUserIdByUsername(username);
        if (!userID) {
            console.error('User not found');
            throw new Error('User not found');
        }
        const result = await sql.query(`
            SELECT COUNT(*) as count 
            FROM Following
            WHERE FollowingID = '${userID}'    
        `);
        return result.recordset;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getFollowingForUser = async (username) => {
    try {
        let userID = await getUserIdByUsername(username);
        if (!userID) {
            console.error('User not found');
            throw new Error('User not found');
        }
        const result = await sql.query(`
            SELECT COUNT(*) as count 
            FROM Following
            WHERE FollowerID = '${userID}'    
        `);
        return result.recordset;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getFollowingPostsForUser = async (username) => {
    try {
        let userID = await getUserIdByUsername(username);
        if (!userID) {
            console.error('User not found');
            throw new Error('User not found');
        }
        const result = await sql.query(`
            SELECT DISTINCT p.postID, p.Username, p.Caption, p.[Image]
            FROM dbo.users u
            JOIN dbo.Following f ON f.FollowerID = u.userID
            JOIN dbo.posts p ON f.FollowingID = p.UserID
            WHERE u.username = '${username}';    
        `)
        return result.recordset;
    } catch (err) {
        console.log(err);
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

const addPost = async (username, caption, filePath) => {
    let userID = await getUserIdByUsername(username);
    if (!userID) {
        console.error('User not found');
        throw new Error('User not found');
    }

    try {
        const request = new sql.Request();
        request.input('UserID', sql.UniqueIdentifier, userID);
        request.input('Username', sql.NVarChar(50), username);
        request.input('Caption', sql.NVarChar(255), caption);
        request.input('Image', sql.NVarChar(255), filePath);

        await request.query(`
            INSERT INTO dbo.posts (UserID, Username, Caption, Image)
            VALUES (@UserID, @Username, @Caption, @Image)
        `);
    } catch (err) {
        console.error('Error adding post', err);
        throw err;
    }
};



const addFollower = async (follower, following) => {
    let followerID = await getUserIdByUsername(follower);
    let followingID = await getUserIdByUsername(following);
    if (!followerID || !followingID) {
        console.error('User(s) not found', err)
        throw new Error('User(s) not found');
    }
    try {
        await sql.query(`
            INSERT INTO dbo.Following (FollowerID, FollowingID)
            VALUES ('${followerID}', '${followingID}')
        `)
    } catch (err) {
        console.error('Error adding follower', err)
        throw err;
    }
};
const getUserIdByUsername = async (username) => {
    try {
        const result = await sql.query(`SELECT dbo.users.userID FROM dbo.users WHERE username='${username}'`);
        return result.recordset[0].userID;
    } catch (err) {
        console.error('Error getting userID by username', err)
        throw err;
    }
};

const unfollowForLoggedInUser = async (follower, following) => {
    try {
        const result = await sql.query(`
            DELETE f
            FROM dbo.Following f
            INNER JOIN dbo.Users u ON u.userID = f.FollowerID
            WHERE u.username = '${follower}'
            AND f.FollowingID = (SELECT userID FROM dbo.Users WHERE username = '${following}');
        `);
        return result.output; 
    } catch(err) {
        console.log(err)
    }
};

const followForLoggedInUser = async (follower, following) => {
    try {
        const result = await sql.query(`
            INSERT INTO dbo.Following (FollowerID, FollowingID)
            SELECT u1.userID AS FollowerID, u2.userID AS FollowingID
            FROM dbo.Users u1, dbo.Users u2
            WHERE u1.username = '${follower}' 
            AND u2.username = '${following}'
            AND NOT EXISTS (
                SELECT 1 
                FROM dbo.Following f
                WHERE f.FollowerID = u1.userID 
                AND f.FollowingID = u2.userID
            );
        `);
        return result.output;
    } catch (err) {
        console.log(err);       
    }
};

const searchUsers = async (searchInput) => {
    try {
        const request = new sql.Request();
        request.input('searchInput', sql.NVarChar, `%${searchInput}%`);
        const result = await request.query(`
            SELECT TOP (10) * 
            FROM dbo.users 
            WHERE username LIKE @searchInput 
            ORDER BY username
        `);
        return result.recordset;
    } catch (err) {
        console.error('Error in searchUsers query:', err);
        throw err;
    }
};

const deletePost = async (postID) => {
    try {
        const response = await sql.query(`
            DELETE FROM dbo.Posts 
            WHERE PostID = '${postID}';     
        `); 
        return response; 
    } catch (err) {
        console.error('Error deleting post: ', err)
        throw err; 
    }
}; 

module.exports = {
    getUsers,
    addUser,
    getUserIdByUsername,
    addPost,
    addFollower,
    getPostsForUser,
    getFollowersForUser,
    getFollowingForUser,
    getFollowingPostsForUser,
    unfollowForLoggedInUser,
    followForLoggedInUser,
    searchUsers, 
    deletePost
};