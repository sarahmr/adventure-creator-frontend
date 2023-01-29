import React, { useState } from "react";

export default function RatingAndReviewForm(props) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleReviewText = (event) => {
    setReviewText(event.target.value);
  };

  const handleStars = (num) => {
    setRating(num);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // ratings and reviews need user_id and story_id
    fetch(`${process.env.REACT_APP_SERVER_URL}/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        story_id: props.story.id,
        user_id: props.user.id,
        review: reviewText,
        rating: rating,
      }),
    })
      .then((res) => res.json())
      .then((reviewObj) => {
        console.log(reviewObj);
        props.getNewReviews(reviewObj);
      });
    setRating(0);
    setReviewText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="review-form">
        <div className="review-title">
          <h4>Leave a Review:</h4>
        </div>
        <div className="review-content-rating">
          <h2>
            <span
              onClick={() => handleStars(1)}
              className={rating >= 1 ? "filled-stars" : "empty-stars"}
            >
              {rating >= 1 ? "★" : "☆"}
            </span>
            <span
              onClick={() => handleStars(2)}
              className={rating >= 2 ? "filled-stars" : "empty-stars"}
            >
              {rating >= 2 ? "★" : "☆"}
            </span>
            <span
              onClick={() => handleStars(3)}
              className={rating >= 3 ? "filled-stars" : "empty-stars"}
            >
              {rating >= 3 ? "★" : "☆"}
            </span>
            <span
              onClick={() => handleStars(4)}
              className={rating >= 4 ? "filled-stars" : "empty-stars"}
            >
              {rating >= 4 ? "★" : "☆"}
            </span>
            <span
              onClick={() => handleStars(5)}
              className={rating >= 5 ? "filled-stars" : "empty-stars"}
            >
              {rating >= 5 ? "★" : "☆"}
            </span>
          </h2>
        </div>
        <div className="review-content-review">
          <textarea
            placeholder="Your thoughts..."
            rows="3"
            type="text"
            name="reviewText"
            value={reviewText}
            onChange={handleReviewText}
          />
        </div>
        <div className="review-submit">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
}
