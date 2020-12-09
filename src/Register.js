import React from 'react'

class Register extends React.Component {

  state ={
    name: '',
    username: '',
    password: '',
    email: '',
    bio: ''
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
      let { user, token, image } = data
      this.props.handleLogin(user, image)
      localStorage.token = token
    })
  }

  render(){
    return (
      <div className="user-forms">
        <h2>Create an Account</h2>
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
          <input class="user-forms-submit" type='submit'></input>
        </form>
      </div>
    )
  }
}

export default Register