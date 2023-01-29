import React from "react";

export default function Review(props) {
  const renderRating = () => {
    return (
      <>
        <span
          className={props.review.rating >= 1 ? "filled-stars" : "empty-stars"}
        >
          {props.review.rating >= 1 ? "★" : "☆"}
        </span>
        <span
          className={props.review.rating >= 2 ? "filled-stars" : "empty-stars"}
        >
          {props.review.rating >= 2 ? "★" : "☆"}
        </span>
        <span
          className={props.review.rating >= 3 ? "filled-stars" : "empty-stars"}
        >
          {props.review.rating >= 3 ? "★" : "☆"}
        </span>
        <span
          className={props.review.rating >= 4 ? "filled-stars" : "empty-stars"}
        >
          {props.review.rating >= 4 ? "★" : "☆"}
        </span>
        <span
          className={props.review.rating >= 5 ? "filled-stars" : "empty-stars"}
        >
          {props.review.rating >= 5 ? "★" : "☆"}
        </span>
      </>
    );
  };

  return (
    <div className="single-review">
      <div>
        <img src={props.review.user.image} alt="user" />
      </div>
      <div className="user-review">
        <h4>
          {props.review.user.username} rated it {renderRating()}
        </h4>
        <p>{props.review.review}</p>
      </div>
    </div>
  );
}
