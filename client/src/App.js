import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/form/form.jsx"
import AddUserForm from "./components/form/addUserForm.jsx";
import AddPostForm from "./components/form/addPostForm.jsx";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
      <h2><Form /></h2>
      <h2><AddUserForm /></h2>
      <h2><AddPostForm /></h2>
    </div>
  );
}

export default App
