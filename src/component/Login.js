import React, { useState } from "react";
import axios from "axios";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Email:", email, "Password:", password);
  // };

   // handle login form submission
   const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", { email, password })
      .then(response => {
        console.log("response",response)
      })
      .catch(error => {
        setError(error.response.data.msg);
      });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
