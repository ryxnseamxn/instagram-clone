import React from 'react'; 
import Form from "../form/form.jsx"
import AddUserForm from "../form/addUserForm.jsx";
import AddPostForm from "../form/addPostForm.jsx";
import AddFollowerForm from "../form/addFollowerForm.jsx";

const Debug = () => {
    return (
        <div className="App">
        <h2><Form /></h2>
        <h2><AddUserForm /></h2>
        <h2><AddPostForm /></h2>
        <h2><AddFollowerForm /></h2>
      </div>
    ); 
}

export default Debug; 