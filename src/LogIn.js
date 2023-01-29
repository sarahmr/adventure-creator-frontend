import React, { useState } from "react";
import { Link, withRouter, redirect } from "react-router-dom";

export default function LogIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleForm = (event) => {
    event.target.name === "username"
      ? setUsername(event.target.value)
      : setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          // display error message
          setIsError(true);
        } else {
          localStorage.token = data.token;

          props.handleLogin(data.user, data.image);
          return redirect("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="user-forms">
      <h2>Log In</h2>
      <div>
        <p className="error-message">
          {isError && "Incorrect username or password"}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
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
        <input className="user-forms-submit" type="submit"></input>
      </form>
      <p>
        Need an account? Register <Link to="/register">here</Link>
      </p>
    </div>
  );
}
