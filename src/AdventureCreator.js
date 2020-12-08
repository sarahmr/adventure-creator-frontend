import React from 'react';
import StoryEditor from './StoryEditor'
import SiteNavBar from './SiteNavBar'
import StoriesList from './StoriesList'
import PlayArea from './PlayArea'
import { Switch, Route, withRouter } from 'react-router-dom'
import LogIn from './LogIn'
import UserStories from './UserStories'
import Register from './Register'
import StoryDetails from './StoryDetails'

class AdventureCreator extends React.Component {

  state = {
    currentUser: null
  }

  componentDidMount(){
    if (localStorage.token){
      fetch('http://localhost:3001/autologin', {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          this.handleLogin(data.user, data.image)
        }
      })
    }
  }

  handleLogin = (currentUser, image) => {
   currentUser["image"] = image 
   this.setState({ currentUser })
  }

  handleLogout = () => {
    localStorage.removeItem("token")
    this.setState({
      currentUser: null
    }, () => {this.props.history.push('/')})
  }

  createStory = (event) => {
    event.preventDefault()
    // create a story 
    fetch('http://localhost:3001/stories', {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        title: '',
        published: false,
        user_id: `${this.state.currentUser.id}`,
        brief_description: ''
      })
    })
    .then(res => res.json())
    .then(newStory => {
      this.props.history.push(`/edit/${newStory.id}`)
    })
  }

  render(){
    return (
      <div>
        <SiteNavBar 
          handleLogout={this.handleLogout} 
          user={this.state.currentUser} 
          createStory={this.createStory} 
        />
        <Switch>
          <Route path='/login'>
            <LogIn handleLogin={this.handleLogin} />
          </Route>
          <Route path='/edit/:id' >
            <StoryEditor />
          </Route>
          <Route path='/story/:id'>
            <StoryDetails 
              user={this.state.currentUser}
            />
          </Route>
          <Route path="/play/:id" >
            <PlayArea />
          </Route> 
          <Route path='/author/:id' >
            <UserStories 
              user={this.state.currentUser}
            />
          </Route>
          <Route path='/register' >
            <Register handleLogin={this.handleLogin} />
          </Route>
          <Route path="/" >
            <StoriesList />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(AdventureCreator);
