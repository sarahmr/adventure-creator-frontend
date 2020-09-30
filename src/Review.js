import React from 'react'

class Review extends React.Component {

  renderRating = () => {
    return (
      <>
        <span className={this.props.review.rating >= 1 ? "filled-stars" : 'empty-stars'} >
          { this.props.review.rating >= 1 ? '★' : '☆' }
        </span>
        <span className={this.props.review.rating >= 2 ? "filled-stars" : 'empty-stars'} >
          { this.props.review.rating >= 2 ? '★' : '☆' }
        </span>
        <span className={this.props.review.rating >= 3 ? "filled-stars" : 'empty-stars'} >
          { this.props.review.rating >= 3 ? '★' : '☆' }
        </span>
        <span className={this.props.review.rating >= 4 ? "filled-stars" : 'empty-stars'} >
          { this.props.review.rating >= 4 ? '★' : '☆' }
        </span>
        <span className={this.props.review.rating >= 5 ? "filled-stars" : 'empty-stars'} >
          { this.props.review.rating >= 5 ? '★' : '☆' }
        </span>
      </>
    )
  }

  render(){
    return (
      <div className="single-review">
        <div>
          <img src={this.props.review.user.image} alt="user"/>
        </div>
        <div className="user-review">
          <h4>{this.props.review.user.username} rated it {this.renderRating()}</h4>
          <p>{this.props.review.review}</p>
        </div>
      </div>
    )
  }
}

export default Review;