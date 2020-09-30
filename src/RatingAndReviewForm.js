import React from 'react'

class RatingAndReviewForm extends React.Component {

  state = {
    rating: 0,
    reviewText: ''
  }

  handleReview = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleStars = (num) => {
    this.setState({
      rating: num
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    // ratings and reviews need user_id and story_id
    fetch("http://localhost:3001/reviews", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        story_id: this.props.story.id,
        user_id: this.props.user.id,
        review: this.state.reviewText,
        rating: this.state.rating
      })
    })
    .then(res => res.json())
    .then(reviewObj => {
      console.log(reviewObj)
      this.props.getNewReviews(reviewObj)
    })

    this.setState({
      rating: 0,
      reviewText: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="review-form">
          <div className="review-title">
            <h4>Leave a Review:</h4>
          </div>
          <div className="review-content-rating">
            <h4>Rating:</h4>
            <h2>
              <span onClick={() => this.handleStars(1)} className={this.state.rating >= 1 ? "filled-stars" : 'empty-stars'} >
                { this.state.rating >= 1 ? '★' : '☆' }
              </span>
              <span onClick={() => this.handleStars(2)} className={this.state.rating >= 2 ? "filled-stars" : 'empty-stars'} >
                { this.state.rating >= 2 ? '★' : '☆' }
              </span>
              <span onClick={() => this.handleStars(3)} className={this.state.rating >= 3 ? "filled-stars" : 'empty-stars'} >
                { this.state.rating >= 3 ? '★' : '☆' }
              </span>
              <span onClick={() => this.handleStars(4)} className={this.state.rating >= 4 ? "filled-stars" : 'empty-stars'} >
                { this.state.rating >= 4 ? '★' : '☆' }
              </span>
              <span onClick={() => this.handleStars(5)} className={this.state.rating >= 5 ? "filled-stars" : 'empty-stars'} >
                { this.state.rating >= 5 ? '★' : '☆' }
              </span>
            </h2>
          </div>
          <div className="review-content-review">
            <h4>Your thoughts:</h4>
            <textarea type="text" name="reviewText" value={this.state.reviewText} onChange={this.handleReview} />
          </div>
          <div className="review-submit">
            <input type="submit" />
          </div>
        </form>
      </div>
    )
  }
}

export default RatingAndReviewForm