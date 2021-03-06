import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class LogIn extends React.Component {

  state = {
    username: '',
    password: '',
    error: false
  }

  handleForm = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    fetch('http://localhost:3001/login', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        console.log(data.error)
        // display error message
        this.setState({
          error: true
        })
      } else {
        localStorage.token = data.token
        this.props.handleLogin(data.user, data.image)
        this.props.history.push('/')
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  render(){
    return (
      <div className="user-forms">
        <h2>Log In</h2>
        <div>
          <p className="error-message" >{this.state.error && "Incorrect username or password"}</p>
        </div>
        <form onSubmit={this.handleSubmit} >
          <div>
            <label>Username: </label>
            <input type='text' name='username' value={this.state.username} onChange={this.handleForm} ></input>
          </div>
          <div>
            <label>Password: </label>
            <input type="password" name='password' value={this.state.password} onChange={this.handleForm} ></input>
          </div>
          <input className="user-forms-submit" type='submit'></input>
        </form>
      <p>Need an account? Register <Link to='/register' >here</Link></p>
      </div>
    )
  }
}

export default withRouter(LogIn)