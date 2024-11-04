import React, { useState, useEffect } from "react";
import "./App.css";
import AddUserForm from "./components/form/addUserForm.jsx";
import AddPostForm from "./components/form/addPostForm.jsx";
import AddFollowerForm from "./components/form/addFollowerForm.jsx";
import Navbar from "./components/navbar/navbar.jsx";

function App() {

  return (
    <div className="App">
      <h2><AddUserForm /></h2>
      <h2><AddPostForm /></h2>
      <h2><AddFollowerForm /></h2>
      <Navbar />
    </div>
  );
}

export default App
