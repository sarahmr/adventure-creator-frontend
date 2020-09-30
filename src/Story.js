import React from 'react'
import { withRouter, Link } from 'react-router-dom'

class Story extends React.Component {

  storyDetails = () => {
    this.props.history.push(`/story/${this.props.story.id}`)
  }

  render(){
    // three cases:
    // 1) your personal profile, need title, avg. rating, status
    
    // below can be handled by same condition is the logged in user the user for this page?
    // 2) main page, title, avg. rating
    // 3) someone else's profile, need title, avg. rating
    return(
        <div className="story-card" onClick={this.storyDetails}>
          <div className="story-info">
          <h2>{this.props.story.title}</h2>
          <h4><span>Written by: </span> 
            <Link to={`/author/${this.props.story.user.id}`} onClick={(e) => e.stopPropagation()}>{this.props.story.user.name}</Link>
          </h4>
          { this.props.user && this.props.userProfile && 
            <>
            { this.props.user.id === this.props.userProfile.id && <p>Story status: {this.props.story.published ? "Published" : "Draft" } </p>  } 
            </>
          }
          </div>
          <div className="rating">
          { this.props.story.avg_rating === null ? <p>Be the first to play and review this story!</p> : 
            <p><span>Average Rating: </span>
              <span className={this.props.story.avg_rating >= 1 ? "filled-stars" : 'empty-stars'} >
                { this.props.story.avg_rating >= 1 ? '★' : '☆' }
              </span>
              <span className={this.props.story.avg_rating >= 2 ? "filled-stars" : 'empty-stars'} >
                { this.props.story.avg_rating >= 2 ? '★' : '☆' }
              </span>
              <span className={this.props.story.avg_rating >= 3 ? "filled-stars" : 'empty-stars'} >
                { this.props.story.avg_rating >= 3 ? '★' : '☆' }
              </span>
              <span className={this.props.story.avg_rating >= 4 ? "filled-stars" : 'empty-stars'} >
                { this.props.story.avg_rating >= 4 ? '★' : '☆' }
              </span>
              <span className={this.props.story.avg_rating >= 5 ? "filled-stars" : 'empty-stars'} >
                { this.props.story.avg_rating >= 5 ? '★' : '☆' }
              </span>
            </p>
          }
          </div>
        </div>
    )
  }
}

export default withRouter(Story);