import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import RatingAndReviewForm from './RatingAndReviewForm'
import Review from './Review'

class StoryDetails extends React.Component {

  state = {
    story: null, 
    reviews: []
  }

  componentDidMount() {
    fetch(`http://localhost:3001/stories/${this.props.match.params.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(storyObj => {
      this.setState({
        story: storyObj,
        reviews: storyObj.reviews
      })
    })
  }

  startStory = (id) => {
    this.props.history.push(`/play/${id}`)
  }

  storyToDelete = (id) => {
    // delete story from database
    fetch(`http://localhost:3001/stories/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(deletedStory => {
      this.props.history.push(`/author/${this.props.user.id}`)
    })
  }

  getNewReviews = (reviewObj) => {
    // add new review to state
    this.setState({
      reviews: [...this.state.reviews, reviewObj]
    })
  }

  renderReviews = () => {
    return this.state.reviews.map(review => <Review key={review.id} review={review} />)
  }

  render() {
    if (!(this.state.story && this.props.user)) {
      return null
    }
    return (
      <div>
        <div className="story-details">
          <h2>{this.state.story.title}</h2>
            <h4><span>Written by: </span> 
              <Link to={`/author/${this.state.story.user.id}`}>{this.state.story.user.name}</Link>
            </h4>
          <p>Synopsis: {this.state.story.brief_description}</p>
          { this.props.user.id === this.state.story.user.id ? <> { this.state.story.published ? <p>Status: Published</p> : <p>Status: Draft</p> } </> : null }
        </div>
        <div className="story-buttons" >
          <button onClick={() => this.startStory(this.state.story.id)} >Play</button>
          { this.props.user.id === this.state.story.user.id ? 
            <> 
              <button onClick={() => {this.props.history.push(`/edit/${this.state.story.id}`)}} >Edit Story</button> 
              <button onClick={() => {this.storyToDelete(this.state.story.id)}} >Delete Story</button> 
            </> 
          : null } 
        </div>
        <div className="reviews">
          <RatingAndReviewForm story={this.state.story} user={this.props.user} getNewReviews={this.getNewReviews} />
          {this.renderReviews()}
        </div>
      </div>
    )
  }
}

export default withRouter(StoryDetails)