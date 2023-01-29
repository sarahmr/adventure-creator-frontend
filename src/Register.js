import React, { useState } from "react";
import { withRouter, redirect } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(false);

  const handleForm = (event) => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "bio") {
      setBio(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_SERVER_URL}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
        email: email,
        bio: bio,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
          // display error message
          setError(true);
        } else {
          let { user, token, image } = data;
          // this.props.handleLogin(user, image);
          localStorage.token = token;
          redirect(`/author/${user.id}`);
        }
      });
  };

  return (
    <div className="user-forms">
      <h2>Create an Account</h2>
      <div>
        <p className="error-message">
          {error && "Username has already been taken"}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleForm}
          ></input>
        </div>
        <div>
          <label>Email: </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleForm}
          ></input>
        </div>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleForm}
          ></input>
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleForm}
          ></input>
        </div>
        <div>
          <label>Bio: </label>
          <textarea
            rows="4"
            type="text"
            name="bio"
            value={bio}
            onChange={handleForm}
          ></textarea>
        </div>
        <input className="user-forms-submit" type="submit"></input>
      </form>
    </div>
  );
}
