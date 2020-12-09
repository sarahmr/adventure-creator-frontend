import React from 'react'
import { withRouter } from 'react-router-dom'

class Register extends React.Component {

  state ={
    name: '',
    username: '',
    password: '',
    email: '',
    bio: '',
    error: false
  }

  handleForm = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    fetch('http://localhost:3001/users', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.error) {
        console.log(data.error)
        // display error message
        this.setState({
          error: true
        })
      } else {
        let { user, token, image } = data
        this.props.handleLogin(user, image)
        localStorage.token = token
        this.props.history.push(`/author/${user.id}`)
      }
    })
  }

  render(){
    return (
      <div className="user-forms">
        <h2>Create an Account</h2>
        <div>
          <p className="error-message" >{this.state.error && "Username has already been taken"}</p>
        </div>
        <form onSubmit={this.handleSubmit} >
          <div>
            <label>Name: </label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleForm} ></input>
          </div>
          <div>
            <label>Email: </label>
            <input type="text" name="email" value={this.state.email} onChange={this.handleForm} ></input>
          </div>
          <div>
            <label>Username: </label>
            <input type='text' name='username' value={this.state.username} onChange={this.handleForm} ></input>
          </div>
          <div>
            <label>Password: </label>
            <input type="password" name='password' value={this.state.password} onChange={this.handleForm} ></input>
          </div>
          <div>
            <label>Bio: </label>
            <textarea rows="4" type="text" name="bio" value={this.state.bio} onChange={this.handleForm} ></textarea>
          </div>
          <input className="user-forms-submit" type='submit'></input>
        </form>
      </div>
    )
  }
}

export default withRouter(Register)