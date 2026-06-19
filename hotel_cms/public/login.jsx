import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    if (username.trim() === "" || password.trim() === "") {
      alert("Enter credentials");
      return;
    }

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("Login Successful ✅");
      } else {
        alert("Invalid Username or Password ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div>
      <h2>Hotel Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>
        Login
      </button>
    </div>
  );
}

export default Login;