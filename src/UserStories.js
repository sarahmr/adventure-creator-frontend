import React from 'react'
import Story from './Story'
import { withRouter } from 'react-router-dom'

class UserStories extends React.Component {

  state = {
    stories: [],
    userProfile: null
  }

  // fetch for user stories, filter for published ones if the logged in user isn't the userProfile users -- done on backend

  componentDidMount(){
    fetch(`http://localhost:3001/user_stories/${this.props.match.params.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(storyObj => {
      this.setState({
        stories: storyObj
      })
    })

    fetch(`http://localhost:3001/users/${this.props.match.params.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(userObj => {
      userObj.user["image"] = userObj.image

      this.setState({
        userProfile: userObj.user
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      fetch(`http://localhost:3001/user_stories/${this.props.match.params.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(storyObj => {
      this.setState({
        stories: storyObj
      })
    })

    fetch(`http://localhost:3001/users/${this.props.match.params.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(userObj => {
      userObj.user["image"] = userObj.image

      this.setState({
        userProfile: userObj.user
      })
    })
    }
  }

 renderStories = () => {

   return this.state.stories.map(story => <Story 
      key={story.id} 
      story={story} 
      user={this.props.user} 
      userProfile={this.state.userProfile}
    />)
  }

  render(){
    if (!(this.props.user && this.state.userProfile)) {
      return null
    }
    return (
      <div>
        { this.state.userProfile.id === this.props.user.id ? 
        <>
          <div className="user-details">
            <img src={this.state.userProfile.image} alt="author" />
            <h2>Hello {this.state.userProfile.name}!</h2>
            <p>{this.state.userProfile.bio}</p>
            <button>Edit Bio</button>
          </div>
          <div className="stories-list">
            <h3>Stories</h3>
            {this.renderStories()}
          </div> 
        </> 
        :
        <>
          <div className="user-details">
            <img src={this.state.userProfile.image} alt="author" />
            <h2>{this.state.userProfile.name}</h2>
            <p>{this.state.userProfile.bio}</p>
          </div>
          <div className="stories-list">
            <h3>Stories</h3>
            {this.renderStories()}
          </div> 
        </> 
        }
      </div>
    )
  }
}

export default withRouter(UserStories);